import type { IDBPTransaction } from "idb";
import type { Recipe } from "$lib/domain/entities/Recipe";
import { sortRecipesByTimestampDesc } from "$lib/domain/helpers/sortRecipes";
import {
  COFFEEBEANS_STORE_NAME, ENHANCEDCOFFEEBEANS_STORE_NAME, RECIPES_INDEX_COFFEEBEANSID_NAME, RECIPES_STORE_NAME
} from "./core/indexedDbCore";
import type { ICoffeeBeansDB } from "./types/CoffeeBeansDB";
import type { IEnhancedCoffeeBeansDB } from "./types/EnhancedCoffeeBeansDB";
import type { EntitiesDB } from "./types/EntitiesDB";
import { RecipeDB, type IRecipeDB } from "./types/RecipeDB";

export async function regenerateEnhancedCoffeeBeansTable(
  transaction: IDBPTransaction<
    EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "readwrite" | "versionchange"
  >
) {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(ENHANCEDCOFFEEBEANS_STORE_NAME) === false) {
    throw new Error(`Object store ${ENHANCEDCOFFEEBEANS_STORE_NAME} wasn't found.`);
  }
  // Delete the existing EnhancedCoffeeBeans records:
  await transaction.objectStore(ENHANCEDCOFFEEBEANS_STORE_NAME).clear();
  // Populate the EnhancedCoffeeBeans object store by aggregating the Recipes data:
  const coffeeBeansItems: ICoffeeBeansDB[] = await transaction.objectStore(COFFEEBEANS_STORE_NAME).getAll();
  for (const item of coffeeBeansItems) {
    // Get all Recipes by CoffeeBeansId:
    const recipesDB: IRecipeDB[] = await transaction.objectStore(RECIPES_STORE_NAME)
      .index(RECIPES_INDEX_COFFEEBEANSID_NAME).getAll(item.id);
    // Filter, transform to Recipe and sort the recipes by latest timestamp:
    const validRecipes: Recipe[] = recipesDB.filter(r => r.softDeletionTimestamp === undefined)
      .map(r => new RecipeDB(r).toRecipe())
      .toSorted(sortRecipesByTimestampDesc);
    // Prepare the aggregated info from Recipes:
    const enhancedCoffeeBeansItem: IEnhancedCoffeeBeansDB = {
      id: item.id,
      recipesCount: validRecipes.length,
      latestRecipeTimestamp: validRecipes[0]?.timestamp.getTime(),
      earliestRecipeTimestamp: validRecipes.at(-1)?.timestamp.getTime()
    };
    // Save to the EnhancedCoffeeBeans store:
    await transaction.objectStore(ENHANCEDCOFFEEBEANS_STORE_NAME).put(enhancedCoffeeBeansItem);
  }
}