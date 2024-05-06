import type { IDBPDatabase } from "idb";
import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import { Recipe, RecipeSubmit } from "$lib/domain/entities/Recipe";
import type { Count } from "$lib/types/Count";
import { COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME, openEntitiesDB } from "./core/indexedDbCore";
import { DemoCoffeeBeans } from "./data/demo/demoCoffeeBeans";
import { generateDemoRecipes } from "./data/demo/demoRecipes";
import { matchUniqueCoffeeBeansToAdd, matchUniqueRecipesToAdd } from "./data/import/match/arrays";
import { parseCoffeeBeansArray, parseRecipesArray } from "./data/import/parse/arrays";
import { parseDbVersion } from "./data/import/parse/primitives";
import { vacuumSoftDeletedCoffeeBeans, vacuumSoftDeletedRecipes } from "./data/vacuum";
import { CoffeeBeansDB, CoffeeBeansDBSubmit, type ICoffeeBeansDB } from "./types/CoffeeBeansDB";
import type { EntitiesDB } from "./types/EntitiesDB";
import type { ExportJSON } from "./types/ExportJSON";
import type { ImportJSON } from "./types/ImportJSON";
import { RecipeDB, RecipeDBSubmit, type IRecipeDB } from "./types/RecipeDB";

// Public functions:

export async function deleteAllData(): Promise<void> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = await db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readwrite");
  // Delete all entities:
  await tx.objectStore(RECIPES_STORE_NAME).clear();
  await tx.objectStore(COFFEEBEANS_STORE_NAME).clear();
  await tx.done;
}

export async function exportAllData(): Promise<Blob> {
  // Open a transaction:
  const db: IDBPDatabase<EntitiesDB> = await openEntitiesDB();
  const tx = await db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readonly");
  // Load the CoffeeBeans items and Recipes:
  const coffeeBeansDbItems: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE_NAME).getAll();
  const recipeDbItems: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME).getAll();
  const _dbVersion: number = tx.db.version;
  await tx.done;
  // Prepare the CoffeeBeans items and Recipes:
  const coffeeBeansItems: CoffeeBeans[] = coffeeBeansDbItems
    .filter(itemDb => itemDb.softDeleted === undefined || itemDb.softDeleted === false)
    .map(itemDb => new CoffeeBeansDB(itemDb).toCoffeeBeans());
  const recipes: Recipe[] = recipeDbItems
    .filter(itemDb => itemDb.softDeleted === undefined || itemDb.softDeleted === false)
    .map(itemDb => new RecipeDB(itemDb).toRecipe());
  // Prepare the export data object:
  const exported: ExportJSON = {
    dbVersion: _dbVersion,
    coffeeBeans: coffeeBeansItems,
    recipes: recipes
  };
  // Serialize all data:
  const json = JSON.stringify(exported);
  return new Blob([json], { type: "application/json" });
}

export async function fillDbWithDemoData(): Promise<void | "TransactionAborted"> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = await db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readwrite");
  // Iterate over demo CoffeeBeans items:
  for (const item of DemoCoffeeBeans) {
    // Prepare the CoffeeBeans item entity:
    const coffeeBeansItemDb = new CoffeeBeansDBSubmit(item);
    // Save the CoffeeBeans entity:
    let coffeeBeansId: number;
    try {
      coffeeBeansId = await tx.objectStore(COFFEEBEANS_STORE_NAME).add(coffeeBeansItemDb as ICoffeeBeansDB);
    }
    catch (error) {
      // Protect against an unlikely CoffeeBeans name collision:
      tx.abort();
      console.error(error);
      return "TransactionAborted";
    }
    // Generate the Recipes for this CoffeeBeansId:
    const recipes: RecipeSubmit[] = generateDemoRecipes(coffeeBeansId);
    // Iterate over demo Recipe items:
    for (const recipe of recipes) {
      // Prepare the Recipe entity:
      const recipeItemDb = new RecipeDBSubmit(recipe);
      // Save the Recipe entity:
      await tx.objectStore(RECIPES_STORE_NAME).add(recipeItemDb as unknown as IRecipeDB);
    }
  }
  await tx.done;
}

/**
 * The import will be aborted, if anything is wrong in the `jsonFile`.
 */
export async function importDataFromJson(jsonFile: File): Promise<Count | "ImportFailed"> {
  // Deserialize all data:
  const imported: ImportJSON = JSON.parse(await jsonFile.text());
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = await db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readwrite");
  // Parse the DbVersion field:
  const parsedDbVersion: number | "ImportFailed" = parseDbVersion(imported.dbVersion, tx.db.version);
  // Guard clause:
  if (parsedDbVersion === "ImportFailed") {
    await tx.abort();
    return "ImportFailed";
  }
  // Use a Map to keep track of the correct Id's for imported CoffeeBeans:
  const matchCoffeeBeansIds = new Map<number, number>();
  // Load the CoffeeBeans items from DB:
  const dbCoffeeBeans: CoffeeBeans[] = await tx.objectStore(COFFEEBEANS_STORE_NAME).getAll();
  // Parse the CoffeeBeans array:
  const parsedCoffeeBeansArray: CoffeeBeans[] | "ImportFailed" = parseCoffeeBeansArray(imported.coffeeBeans);
  if (parsedCoffeeBeansArray === "ImportFailed") {
    await tx.abort();
    return "ImportFailed";
  }
  const uniqueCoffeeBeans: CoffeeBeans[] = matchUniqueCoffeeBeansToAdd(
    parsedCoffeeBeansArray, dbCoffeeBeans, matchCoffeeBeansIds
  );
  // Save the unique CoffeeBeans items:
  let addedCoffeeBeansCount: number = 0;
  for (const parsedItem of uniqueCoffeeBeans) {
    // Prepare the new CoffeeBeans item:
    const itemSubmit: CoffeeBeansDBSubmit = new CoffeeBeansDBSubmit(parsedItem);
    // Save the new CoffeeBeans item:
    const savedItemId: number = await tx.objectStore(COFFEEBEANS_STORE_NAME).add(itemSubmit as ICoffeeBeansDB);
    // Make sure to keep track of the created CoffeeBeans' Id to map the Recipe's CoffeeBeansId later.
    matchCoffeeBeansIds.set(parsedItem.id, savedItemId);
    // Count the added CoffeeBeans item:
    addedCoffeeBeansCount++;
  }
  // Parse the Recipes array:
  // Load the DB's Recipes:
  const dbRecipes: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME).getAll();
  // Parse the imported Recipes array:
  const parsedRecipesArray: Recipe[] | "ImportFailed" = parseRecipesArray(imported.recipes, matchCoffeeBeansIds);
  // Guard clause:
  if (parsedRecipesArray === "ImportFailed") {
    await tx.abort();
    return "ImportFailed";
  }
  // Find the unique Recipes to add:
  const uniqueRecipes: Recipe[] = matchUniqueRecipesToAdd(parsedRecipesArray, dbRecipes);
  // Save the unique Recipes:
  let addedRecipesCount: number = 0;
  for (const item of uniqueRecipes) {
    await tx.objectStore(RECIPES_STORE_NAME).add(new RecipeDBSubmit(item) as unknown as IRecipeDB);
    addedRecipesCount++;
  }
  await tx.done;
  // Return the new CoffeeBeans and Recipes counts:
  return { coffeeBeansCount: addedCoffeeBeansCount, recipesCount: addedRecipesCount };
}

export async function vacuumSoftDeletedEntities(): Promise<void> {
  await vacuumSoftDeletedRecipes();
  await vacuumSoftDeletedCoffeeBeans();
}