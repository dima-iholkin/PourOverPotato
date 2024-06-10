import { openDB, type IDBPDatabase, type IDBPTransaction } from "idb";
import { regenerateEnhancedCoffeeBeansTable } from "$lib/database/manageEnhancedCoffeeBeans";
import type { EntitiesDB } from "$lib/database/types/EntitiesDB";
import {
  migrateCoffeeBeansFromV1ToV3, migrateCoffeeBeansFromV2ToV3, migrateRecipesFromV1ToV3, migrateRecipesFromV2ToV3
} from "./core/migrations";

// Internal constants:
const DB_NAME = "entities";
const DB_VERSION = 3;

// Public constants:
export const COFFEEBEANS_STORE_NAME = "coffeeBeans";
export const COFFEEBEANS_INDEX_NAME = "nameLowerCase";
export const ENHANCEDCOFFEEBEANS_STORE_NAME = "enhancedCoffeeBeans";
export const RECIPES_STORE_NAME = "recipes";
export const RECIPES_INDEX_COFFEEBEANSID_NAME = "coffeeBeansId";

// Public function, the core:
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

// Internal function:
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