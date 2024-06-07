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
  tx: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "readwrite" | "versionchange">
) {
  // Guard clause:
  if (tx.db.objectStoreNames.contains(ENHANCEDCOFFEEBEANS_STORE_NAME) === false) {
    throw new Error(`Object store ${ENHANCEDCOFFEEBEANS_STORE_NAME} wasn't found.`);
  }
  // Empty the existing EnhancedCoffeeBeans table:
  await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE_NAME).clear();
  // Populate the EnhancedCoffeeBeans table by aggregating the Recipes data by CoffeeBeansId:
  const coffeeBeansItems: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE_NAME).getAll();
  for (const item of coffeeBeansItems) {
    await regenerateEnhancedCoffeeBeansItemById(item.id, tx);
  }
}

export async function regenerateEnhancedCoffeeBeansItemById(
  coffeeBeansId: number,
  tx: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "readwrite" | "versionchange">
) {
  // Load the EnhancedCoffeeBeans item:
  let item: IEnhancedCoffeeBeansDB | undefined = await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE_NAME)
    .get(coffeeBeansId);
  // Load all Recipes by CoffeeBeansId:
  const recipesDB: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME)
    .index(RECIPES_INDEX_COFFEEBEANSID_NAME).getAll(coffeeBeansId);
  // Prepare and sort the Recipes by latest timestamp:
  const validRecipes: Recipe[] = recipesDB.filter(r => r.softDeletionTimestamp === undefined)
    .map(r => new RecipeDB(r).toRecipe())
    .toSorted(sortRecipesByTimestampDesc);
  // Prepare and save the changed EnhancedCoffeeBeans item:
  item = {
    id: coffeeBeansId,
    recipesCount: validRecipes.length,
    latestRecipeTimestamp: validRecipes[0]?.timestamp.getTime(),
    earliestRecipeTimestamp: validRecipes.at(-1)?.timestamp.getTime()
  };
  await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE_NAME).put(item);
}