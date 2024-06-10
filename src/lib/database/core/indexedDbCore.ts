import { openDB, type IDBPDatabase, type IDBPTransaction } from "idb";
import { regenerateEnhancedCoffeeBeansTable } from "$lib/database/manageEnhancedCoffeeBeans";
import type { ICoffeeBeansDB } from "$lib/database/types/CoffeeBeansDB";
import type { EntitiesDB } from "$lib/database/types/EntitiesDB";
import { type IRecipeDB } from "$lib/database/types/RecipeDB";
import type { ICoffeeBeansDB_v1 } from "$lib/prevVersions/v1/database/CoffeeBeansDBv1";
import { type IRecipeDB_v1 } from "$lib/prevVersions/v1/database/RecipeDBv1";
import type { ICoffeeBeansDB_v2 } from "$lib/prevVersions/v2/database/CoffeeBeansDBv2";
import { type IRecipeDB_v2 } from "$lib/prevVersions/v2/database/RecipeDBv2";

// Internal constants:
const DB_NAME = "entities";
const DB_VERSION = 3;

// Public constants:
export const COFFEEBEANS_STORE_NAME = "coffeeBeans";
export const COFFEEBEANS_INDEX_NAME = "nameLowerCase";
export const ENHANCEDCOFFEEBEANS_STORE_NAME = "enhancedCoffeeBeans";
export const RECIPES_STORE_NAME = "recipes";
export const RECIPES_INDEX_COFFEEBEANSID_NAME = "coffeeBeansId";

// Public function, the most important function:
export async function openEntitiesDB(): Promise<IDBPDatabase<EntitiesDB>> {
  return await openDB<EntitiesDB>(DB_NAME, DB_VERSION, {
    async upgrade(db, oldVersion, newVersion, transaction) {
      switch (oldVersion) {
        case 0:
          // This case means no DB existed before. Just go to the creation of the current version of object stores:
          break;
        case 1:
          await migrateCoffeeBeansFromV1ToV3(transaction);
          await migrateRecipesFromV1ToV3(transaction);
          break;
        case 2:
          await migrateCoffeeBeansFromV2ToV3(transaction);
          await migrateRecipesFromV2ToV3(transaction);
          break;
        default:
          break;
      }
      // Run to create any object stores that are missing:
      createStoresV3(transaction);
      // Regenerate the EnhancedCoffeeBeansTable:
      await regenerateEnhancedCoffeeBeansTable(transaction);
    }
  });
}

// Internal functions:

function createStoresV3(
  transaction: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">
): void {
  const _db: IDBPDatabase<EntitiesDB> = transaction.db;
  // Create CoffeeBeans store:
  if (_db.objectStoreNames.contains(COFFEEBEANS_STORE_NAME) === false) {
    const coffeeBeansStore = _db.createObjectStore(COFFEEBEANS_STORE_NAME, { keyPath: "id", autoIncrement: true });
    coffeeBeansStore.createIndex(COFFEEBEANS_INDEX_NAME, COFFEEBEANS_INDEX_NAME, { unique: true });
    coffeeBeansStore.createIndex("softDeletionTimestamp", "softDeletionTimestamp", { unique: false });
  }
  // Create CoffeeBeans "softDeletionTimestamp" index:
  if (transaction.objectStore(COFFEEBEANS_STORE_NAME).indexNames.contains("softDeletionTimestamp") === false) {
    transaction.objectStore(COFFEEBEANS_STORE_NAME)
      .createIndex("softDeletionTimestamp", "softDeletionTimestamp", { unique: false });
  }
  // Create Recipes store:
  if (_db.objectStoreNames.contains(RECIPES_STORE_NAME) === false) {
    const recipesStore = _db.createObjectStore(RECIPES_STORE_NAME, { keyPath: "id", autoIncrement: true });
    recipesStore.createIndex(RECIPES_INDEX_COFFEEBEANSID_NAME, RECIPES_INDEX_COFFEEBEANSID_NAME, { unique: false });
    recipesStore.createIndex("outWeight", "outWeight", { unique: false });
    recipesStore.createIndex("rating", "rating", { unique: false });
    recipesStore.createIndex("timestamp", "timestamp", { unique: false });
    recipesStore.createIndex("softDeletionTimestamp", "softDeletionTimestamp", { unique: false });
  }
  // Create Recipes "softDeletionTimestamp" index:
  if (transaction.objectStore(RECIPES_STORE_NAME).indexNames.contains("softDeletionTimestamp") === false) {
    transaction.objectStore(RECIPES_STORE_NAME)
      .createIndex("softDeletionTimestamp", "softDeletionTimestamp", { unique: false });
  }
  // Create EnhancedCoffeeBeans store:
  if (_db.objectStoreNames.contains(ENHANCEDCOFFEEBEANS_STORE_NAME) === false) {
    _db.createObjectStore(ENHANCEDCOFFEEBEANS_STORE_NAME, { keyPath: "id" });
  }
}

/**
 * Initializes the CoffeeBeans' `softDeleted` field to `false`.
 */
async function migrateCoffeeBeansFromV1ToV3(
  transaction: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">
) {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(COFFEEBEANS_STORE_NAME) === false) {
    return;
  }
  // Load all CoffeeBeans:
  const coffeeBeansFromV1 =
    await transaction.objectStore(COFFEEBEANS_STORE_NAME).getAll() as unknown as ICoffeeBeansDB_v1[];
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
async function migrateCoffeeBeansFromV2ToV3(
  transaction: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">
) {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(COFFEEBEANS_STORE_NAME) === false) {
    return;
  }
  // Load all CoffeeBeans:
  const coffeeBeansItemsV2 =
    await transaction.objectStore(COFFEEBEANS_STORE_NAME).getAll() as unknown as ICoffeeBeansDB_v2[];
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
async function migrateRecipesFromV1ToV3(
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
async function migrateRecipesFromV2ToV3(
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