import type { IDBPDatabase } from "idb";
import { openEntitiesDB, COFFEEBEANS_STORE, RECIPES_STORE, ENHANCEDCOFFEEBEANS_STORE } from "$lib/database/core/core";
import { vacuumSoftDeletedCoffeeBeans, vacuumSoftDeletedRecipes } from "$lib/database/manageData/vacuum/vacuum";
import { regenerateEnhancedCoffeeBeansTable } from "$lib/database/manageEnhancedCoffeeBeans";
import { type ICoffeeBeansDB, CoffeeBeansDB, CoffeeBeansDBSubmit } from "$lib/database/models/CoffeeBeansDB";
import type { EntitiesDbSchema } from "$lib/database/models/EntitiesDbSchema";
import { type IRecipeDB, RecipeDB, RecipeDBSubmit } from "$lib/database/models/RecipeDB";
import type { Count } from "$lib/domain/enhancedEntities/Count";
import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { Recipe } from "$lib/domain/entities/Recipe";
import { deduplicateCoffeeBeans } from "./deduplicate/coffeeBeans";
import { findUniqueCoffeeBeans, findUniqueRecipes } from "./match/arrays";
import { parseCoffeeBeansArray } from "./parse/coffeeBeans";
import { parseDbVersion } from "./parse/primitives";
import { parseRecipesArray } from "./parse/recipes";
import type { ExportJSON } from "./types/ExportJSON";
import type { ImportJSON } from "./types/ImportJSON";

// Public functions:

export async function exportAllData(): Promise<Blob> {
  // Open a transaction:
  const db: IDBPDatabase<EntitiesDbSchema> = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE, RECIPES_STORE], "readonly");
  // Load the CoffeeBeans items, the Recipes and the DbVersion:
  const coffeeBeansDbItems: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE).getAll();
  const recipeDbItems: IRecipeDB[] = await tx.objectStore(RECIPES_STORE).getAll();
  const _dbVersion: number = tx.db.version;
  // Close the transaction:
  await tx.done;
  // Prepare the CoffeeBeans items and the Recipes:
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
  const tx = db.transaction([COFFEEBEANS_STORE, RECIPES_STORE, ENHANCEDCOFFEEBEANS_STORE], "readwrite");
  // Vacuum the soft-deleted Recipes and CoffeeBeans items:
  await vacuumSoftDeletedRecipes(tx);
  await vacuumSoftDeletedCoffeeBeans(tx);
  // Parse the DbVersion field:
  const parsedDbVersion: number | "ImportFailed" = parseDbVersion(imported.dbVersion, tx.db.version);
  // Guard clause:
  if (parsedDbVersion === "ImportFailed") {
    tx.abort();
    return "ImportFailed";
  }
  // Keep track of the mapping between the imported CoffeeBeans Ids and the DB CoffeeBeans Ids, using a Map:
  const coffeeBeansIdMapping = new Map<number, number>();
  // Parse the imported CoffeeBeans items:
  let parsedCoffeeBeans: CoffeeBeans[] | "ImportFailed" = parseCoffeeBeansArray(imported.coffeeBeans);
  if (parsedCoffeeBeans === "ImportFailed") {
    tx.abort();
    return "ImportFailed";
  }
  // Load the CoffeeBeans items from the DB:
  const _dbCoffeeBeans: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE).getAll();
  const dbCoffeeBeans: CoffeeBeans[] = _dbCoffeeBeans.map(item => new CoffeeBeansDB(item).toCoffeeBeans());
  // Deduplicate the CoffeeBeans by name:
  parsedCoffeeBeans = deduplicateCoffeeBeans(parsedCoffeeBeans, dbCoffeeBeans);
  // Find the unique CoffeeBeans items to add to the DB:
  const uniqueCoffeeBeans: CoffeeBeans[] = findUniqueCoffeeBeans(
    parsedCoffeeBeans, dbCoffeeBeans, coffeeBeansIdMapping
  );
  // Prepare and save the unique parsed CoffeeBeans items:
  for (const parsedItem of uniqueCoffeeBeans) {
    const itemSubmit: CoffeeBeansDBSubmit = new CoffeeBeansDBSubmit(parsedItem);
    const savedItemId: number = await tx.objectStore(COFFEEBEANS_STORE).add(itemSubmit as ICoffeeBeansDB);
    // Keep track of the CoffeeBeans' Id mapping to map the Recipe's CoffeeBeansId later:
    coffeeBeansIdMapping.set(parsedItem.id, savedItemId);
  }
  // Parse the imported Recipes:
  const parsedRecipes: Recipe[] | "ImportFailed" = parseRecipesArray(imported.recipes, coffeeBeansIdMapping);
  // Guard clause:
  if (parsedRecipes === "ImportFailed") {
    tx.abort();
    return "ImportFailed";
  }
  // Load the Recipes from the DB:
  const _dbRecipes: IRecipeDB[] = await tx.objectStore(RECIPES_STORE).getAll();
  const dbRecipes: Recipe[] = _dbRecipes.map(item => new RecipeDB(item).toRecipe());
  // Find the unique Recipes to add:
  const uniqueRecipes: Recipe[] = findUniqueRecipes(parsedRecipes, dbRecipes);
  // Save the unique Recipes:
  for (const item of uniqueRecipes) {
    const recipeSubmit: RecipeDBSubmit = new RecipeDBSubmit(item); // Takes care of deleting the Recipe Id too.
    await tx.objectStore(RECIPES_STORE).add(recipeSubmit as unknown as IRecipeDB);
  }
  // Regenerate the EnhancedCoffeeBeans table:
  await regenerateEnhancedCoffeeBeansTable(tx);
  // Close the transaction:
  await tx.done;
  // Return the new CoffeeBeans and Recipes counts:
  return { coffeeBeansCount: uniqueCoffeeBeans.length, recipesCount: uniqueRecipes.length };
}