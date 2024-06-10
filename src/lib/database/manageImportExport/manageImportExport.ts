import type { IDBPDatabase } from "idb";
import {
  openEntitiesDB, COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME, ENHANCEDCOFFEEBEANS_STORE_NAME
} from "$lib/database/core/core";
import { regenerateEnhancedCoffeeBeansTable } from "$lib/database/manageEnhancedCoffeeBeans";
import { type ICoffeeBeansDB, CoffeeBeansDB, CoffeeBeansDBSubmit } from "$lib/database/types/CoffeeBeansDB";
import type { EntitiesDB } from "$lib/database/types/EntitiesDB";
import { type IRecipeDB, RecipeDB, RecipeDBSubmit } from "$lib/database/types/RecipeDB";
import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { Recipe } from "$lib/domain/entities/Recipe";
import type { Count } from "$lib/types/Count";
import { matchUniqueCoffeeBeansToAdd, matchUniqueRecipesToAdd } from "./match/arrays";
import { parseCoffeeBeansArray } from "./parse/coffeeBeans";
import { parseDbVersion } from "./parse/primitives";
import { parseRecipesArray } from "./parse/recipes";
import type { ExportJSON } from "./types/ExportJSON";
import type { ImportJSON } from "./types/ImportJSON";

// Public functions:

export async function exportAllData(): Promise<Blob> {
  // Open a transaction:
  const db: IDBPDatabase<EntitiesDB> = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readonly");
  // Load the CoffeeBeans items and Recipes:
  const coffeeBeansDbItems: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE_NAME).getAll();
  const recipeDbItems: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME).getAll();
  const _dbVersion: number = tx.db.version;
  await tx.done;
  // Filter out the soft-deleted CoffeeBeans and Recipes, and convert into core entities:
  const coffeeBeansItems: CoffeeBeans[] = coffeeBeansDbItems
    .filter(itemDb => itemDb.softDeletionTimestamp === undefined)
    .map(itemDb => new CoffeeBeansDB(itemDb).toCoffeeBeans());
  const recipes: Recipe[] = recipeDbItems
    .filter(itemDb => itemDb.softDeletionTimestamp === undefined)
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
 * The import will be aborted, if anything is wrong in the JSON file.
 */
export async function importDataFromJson(jsonFile: File): Promise<Count | "ImportFailed"> {
  // Deserialize all data:
  const imported: ImportJSON = JSON.parse(await jsonFile.text());
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME, ENHANCEDCOFFEEBEANS_STORE_NAME], "readwrite");
  // Parse the DbVersion field:
  const parsedDbVersion: number | "ImportFailed" = parseDbVersion(imported.dbVersion, tx.db.version);
  // Guard clause:
  if (parsedDbVersion === "ImportFailed") {
    tx.abort();
    return "ImportFailed";
  }
  // Use a Map to keep track of the correct Id's for imported CoffeeBeans:
  const matchCoffeeBeansIds = new Map<number, number>();
  // Parse the imported CoffeeBeans array:
  const parsedCoffeeBeansArray: CoffeeBeans[] | "ImportFailed" = parseCoffeeBeansArray(imported.coffeeBeans);
  if (parsedCoffeeBeansArray === "ImportFailed") {
    tx.abort();
    return "ImportFailed";
  }
  // Load the CoffeeBeans items from DB:
  const dbCoffeeBeans: CoffeeBeans[] = await tx.objectStore(COFFEEBEANS_STORE_NAME).getAll();
  // Find the unique CoffeeBeans items to add to the DB:
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
    tx.abort();
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
  // Regenerate the EnhancedCoffeeBeans table:
  await regenerateEnhancedCoffeeBeansTable(tx);
  await tx.done;
  // Return the new CoffeeBeans and Recipes counts:
  return { coffeeBeansCount: addedCoffeeBeansCount, recipesCount: addedRecipesCount };
}