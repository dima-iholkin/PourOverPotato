import type { IDBPTransaction } from "idb";
import { COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME } from "$lib/database/core/core";
import type { ICoffeeBeansDB } from "$lib/database/types/CoffeeBeansDB";
import type { EntitiesDB } from "$lib/database/types/EntitiesDB";
import type { IRecipeDB } from "$lib/database/types/RecipeDB";
import type { ICoffeeBeansDB_v1 } from "$lib/prevVersions/v1/database/CoffeeBeansDBv1";
import type { IRecipeDB_v1 } from "$lib/prevVersions/v1/database/RecipeDBv1";
import type { ICoffeeBeansDB_v2 } from "$lib/prevVersions/v2/database/CoffeeBeansDBv2";
import type { IRecipeDB_v2 } from "$lib/prevVersions/v2/database/RecipeDBv2";

/**
 * Initializes the CoffeeBeans' `softDeleted` field to `false`.
 */
export async function migrateCoffeeBeansFromV1ToV3(
  transaction: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">
) {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(COFFEEBEANS_STORE_NAME) === false) {
    return;
  }
  // Load all CoffeeBeans:
  const coffeeBeansFromV1 = await transaction.objectStore(COFFEEBEANS_STORE_NAME)
    .getAll() as unknown as ICoffeeBeansDB_v1[];
  // Prepare all CoffeeBeans:
  for (const itemV1 of coffeeBeansFromV1) {
    const itemV3: ICoffeeBeansDB = {
      ...itemV1,
      softDeletionTimestamp: undefined
    };
    // Save all modified CoffeeBeans:
    await transaction.objectStore(COFFEEBEANS_STORE_NAME).put(itemV3);
  }
}

/**
 * Makes the CoffeeBeans' `softDeleted` field mandatory.
 */
export async function migrateCoffeeBeansFromV2ToV3(
  transaction: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">
) {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(COFFEEBEANS_STORE_NAME) === false) {
    return;
  }
  // Load all CoffeeBeans:
  const coffeeBeansItemsV2 = await transaction.objectStore(COFFEEBEANS_STORE_NAME)
    .getAll() as unknown as ICoffeeBeansDB_v2[];
  // Prepare all CoffeeBeans:
  for (const itemV2 of coffeeBeansItemsV2) {
    const itemV3: ICoffeeBeansDB = {
      ...itemV2,
      softDeletionTimestamp: itemV2.softDeleted ? Date.now() : undefined
    };
    // @ts-ignore:
    delete itemV3.softDeleted;
    // Save all modified CoffeeBeans:
    await transaction.objectStore(COFFEEBEANS_STORE_NAME).put(itemV3);
  }
}

/**
 * Converts each Recipe's "timestamp" field from `Date` to `number`.
 * Initializes "favorite" and "softDeleted" fields to `false`.
 */
export async function migrateRecipesFromV1ToV3(
  transaction: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">
): Promise<void> {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(RECIPES_STORE_NAME) === false) {
    return;
  }
  // Load all Recipes:
  const recipesFromV1 = await transaction.objectStore(RECIPES_STORE_NAME).getAll() as unknown as IRecipeDB_v1[];
  // Prepare all Recipes:
  for (const itemV1 of recipesFromV1) {
    const itemV3: IRecipeDB = {
      ...itemV1,
      favorite: false,
      timestamp: itemV1.timestamp.getTime(),
      softDeletionTimestamp: undefined
    };
    // Save all modified Recipes:
    await transaction.objectStore(RECIPES_STORE_NAME).put(itemV3);
  }
}

/**
 * Makes the Recipe's `favorite` and `softDeleted` fields mandatory.
 */
export async function migrateRecipesFromV2ToV3(
  transaction: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">
): Promise<void> {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(RECIPES_STORE_NAME) === false) {
    return;
  }
  // Load all Recipes:
  const recipesV2 = await transaction.objectStore(RECIPES_STORE_NAME).getAll() as unknown as IRecipeDB_v2[];
  // Prepare all Recipes:
  for (const itemV2 of recipesV2) {
    const itemV3: IRecipeDB = {
      ...itemV2,
      favorite: itemV2.favorite ?? false,
      softDeletionTimestamp: itemV2.softDeleted ? Date.now() : undefined
    };
    // @ts-ignore:
    delete itemV3.softDeleted;
    // Save all modified Recipes:
    await transaction.objectStore(RECIPES_STORE_NAME).put(itemV3);
  }
}