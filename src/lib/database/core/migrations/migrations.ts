import type { IDBPTransaction } from "idb";
import { COFFEEBEANS_STORE, RECIPES_STORE } from "$lib/database/core/core";
import { CoffeeBeansDB, type ICoffeeBeansDB } from "$lib/database/types/CoffeeBeansDB";
import type { EntitiesDB } from "$lib/database/types/EntitiesDB";
import { RecipeDB, type IRecipeDB } from "$lib/database/types/RecipeDB";
import type { ICoffeeBeansDB_v1 } from "$lib/prevVersions/v1/database/CoffeeBeansDBv1";
import type { EntitiesDB_v1 } from "$lib/prevVersions/v1/database/EntitiesDBv1";
import type { IRecipeDB_v1 } from "$lib/prevVersions/v1/database/RecipeDBv1";
import type { ICoffeeBeansDB_v2 } from "$lib/prevVersions/v2/database/CoffeeBeansDBv2";
import type { EntitiesDB_v2 } from "$lib/prevVersions/v2/database/EntitiesDBv2";
import type { IRecipeDB_v2 } from "$lib/prevVersions/v2/database/RecipeDBv2";

/**
 * Initializes the CoffeeBeans' `softDeleted` field to `false`.
 */
export async function migrateCoffeeBeansV1ToV3(
  transaction: IDBPTransaction<EntitiesDB_v1, ("coffeeBeans" | "recipes")[], "versionchange">
) {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(COFFEEBEANS_STORE) === false) {
    return;
  }
  // Load all CoffeeBeans:
  const coffeeBeansFromV1: ICoffeeBeansDB_v1[] = await transaction.objectStore(COFFEEBEANS_STORE).getAll();
  // Cast the CoffeeBeans store schema to v3:
  const _transaction =
    // eslint-disable-next-line max-len
    transaction as unknown as IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">;
  // Prepare and save all modified CoffeeBeans:
  for (const itemV1 of coffeeBeansFromV1) {
    const objV3: ICoffeeBeansDB = {
      ...itemV1,
      softDeletionTimestamp: undefined
    };
    const itemV3: CoffeeBeansDB = new CoffeeBeansDB(objV3);
    await _transaction.objectStore(COFFEEBEANS_STORE).put(itemV3);
  }
}

/**
 * Makes the CoffeeBeans' `softDeleted` field mandatory.
 */
export async function migrateCoffeeBeansV2ToV3(
  transaction: IDBPTransaction<EntitiesDB_v2, ("coffeeBeans" | "recipes")[], "versionchange">
) {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(COFFEEBEANS_STORE) === false) {
    return;
  }
  // Load all CoffeeBeans items:
  const coffeeBeansItemsV2: ICoffeeBeansDB_v2[] = await transaction.objectStore(COFFEEBEANS_STORE).getAll();
  // Cast the CoffeeBeans store schema to v3:
  const _transaction =
    // eslint-disable-next-line max-len
    transaction as unknown as IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">;
  // Prepare and save all modified CoffeeBeans items:
  for (const itemV2 of coffeeBeansItemsV2) {
    const objV3: ICoffeeBeansDB = {
      ...itemV2,
      softDeletionTimestamp: itemV2.softDeleted ? Date.now() : undefined
    };
    const itemV3: CoffeeBeansDB = new CoffeeBeansDB(objV3); // This takes care of deleting the "softDeleted" field too.
    await _transaction.objectStore(COFFEEBEANS_STORE).put(itemV3);
  }
}

/**
 * Converts each Recipe's "timestamp" field from `Date` to `number`.
 * Initializes "favorite" and "softDeleted" fields to `false`.
 */
export async function migrateRecipesV1ToV3(
  transaction: IDBPTransaction<EntitiesDB_v1, ("coffeeBeans" | "recipes")[], "versionchange">
): Promise<void> {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(RECIPES_STORE) === false) {
    return;
  }
  // Load all Recipes:
  const recipesFromV1: IRecipeDB_v1[] = await transaction.objectStore(RECIPES_STORE).getAll();
  // Cast the Recipe store schema to v3:
  const _transaction =
    // eslint-disable-next-line max-len
    transaction as unknown as IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">;
  // Prepare and save all modified Recipes:
  for (const itemV1 of recipesFromV1) {
    const objV3: IRecipeDB = {
      ...itemV1,
      favorite: false,
      timestamp: itemV1.timestamp.getTime(),
      softDeletionTimestamp: undefined
    };
    const itemV3: RecipeDB = new RecipeDB(objV3);
    await _transaction.objectStore(RECIPES_STORE).put(itemV3);
  }
}

/**
 * Makes the Recipe's `favorite` and `softDeleted` fields mandatory.
 */
export async function migrateRecipesV2ToV3(
  transaction: IDBPTransaction<EntitiesDB_v2, ("coffeeBeans" | "recipes")[], "versionchange">
): Promise<void> {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(RECIPES_STORE) === false) {
    return;
  }
  // Load all Recipes:
  const recipesV2: IRecipeDB_v2[] = await transaction.objectStore(RECIPES_STORE).getAll();
  // Cast the Recipe store schema to v3:
  const _transaction =
    // eslint-disable-next-line max-len
    transaction as unknown as IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">;
  // Prepare and save all modified Recipes:
  for (const itemV2 of recipesV2) {
    const objV3: IRecipeDB = {
      ...itemV2,
      favorite: itemV2.favorite ?? false,
      softDeletionTimestamp: itemV2.softDeleted ? Date.now() : undefined
    };
    const itemV3: RecipeDB = new RecipeDB(objV3); // This takes care of deleting the "softDeleted" field too.
    await _transaction.objectStore(RECIPES_STORE).put(itemV3);
  }
}