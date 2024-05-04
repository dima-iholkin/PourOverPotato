import type { IDBPDatabase } from "idb";
import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import { Recipe } from "$lib/domain/entities/Recipe";
import { COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME, openEntitiesDB } from "../indexedDB_Core";
import { CoffeeBeansDB, CoffeeBeansDBSubmit, type ICoffeeBeansDB } from "../types/CoffeeBeansDB";
import type { Count } from "../types/Count";
import type { EntitiesDB } from "../types/EntitiesDB";
import type { ExportJSON } from "../types/ExportJSON";
import type { ImportJSON } from "../types/ImportJSON";
import { RecipeDB, RecipeDBSubmit, type IRecipeDB } from "../types/RecipeDB";
import { matchUniqueCoffeeBeansToAdd, matchUniqueRecipesToAdd } from "./match/arrays";
import { parseCoffeeBeansArray, parseRecipesArray } from "./parse/arrays";
import { parseDbVersion } from "./parse/primitives";

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