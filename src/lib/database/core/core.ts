import { openDB, type IDBPDatabase, type IDBPTransaction } from "idb";
import { regenerateEnhancedCoffeeBeansTable } from "$lib/database/manageEnhancedCoffeeBeans";
import type { EntitiesDB } from "$lib/database/types/EntitiesDB";
import type { EntitiesDB_v1 } from "$lib/prevVersions/v1/database/EntitiesDBv1";
import type { EntitiesDB_v2 } from "$lib/prevVersions/v2/database/EntitiesDBv2";
import {
  migrateCoffeeBeansV1ToV3, migrateCoffeeBeansV2ToV3, migrateRecipesV1ToV3, migrateRecipesV2ToV3
} from "./migrations/migrations";

// Internal constant:
const DB_VERSION = 4;

// Public constants:

// DB name:
export const DB_NAME = "entities";

// Store names:
export const COFFEEBEANS_STORE = "coffeeBeans";
export const RECIPES_STORE = "recipes";
export const ENHANCEDCOFFEEBEANS_STORE = "enhancedCoffeeBeans";

// Index names:
export const COFFEEBEANS_NAMELOWERCASE_INDEX = "nameLowerCase";
export const RECIPES_COFFEEBEANSID_INDEX = "coffeeBeansId";
export const SOFTDELETIONTIMESTAMP_INDEX = "softDeletionTimestamp";

// Public function, the core:
export async function openEntitiesDB(): Promise<IDBPDatabase<EntitiesDB>> {
  return await openDB<EntitiesDB>(DB_NAME, DB_VERSION, {
    async upgrade(db, oldVersion, newVersion, transaction) {
      // Deal with older versions:
      switch (oldVersion) {
        case 0:
          // This case means no DB existed before. Just go to the creation of the current version of object stores:
          break;
        case 1:
          {
            const _transaction =
              transaction as unknown as IDBPTransaction<EntitiesDB_v1, ("coffeeBeans" | "recipes")[], "versionchange">;
            await migrateCoffeeBeansV1ToV3(_transaction);
            await migrateRecipesV1ToV3(_transaction);
            break;
          }
        case 2:
          {
            const _transaction =
              transaction as unknown as IDBPTransaction<EntitiesDB_v2, ("coffeeBeans" | "recipes")[], "versionchange">;
            await migrateCoffeeBeansV2ToV3(_transaction);
            await migrateRecipesV2ToV3(_transaction);
            break;
          }
        default:
          break;
      }
      // Create any missing object stores and indexes:
      createStoresV3(transaction);
      // Regenerate the EnhancedCoffeeBeans table:
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
  if (_db.objectStoreNames.contains(COFFEEBEANS_STORE) === false) {
    _db.createObjectStore(COFFEEBEANS_STORE, { keyPath: "id", autoIncrement: true });
  }
  // Create the indexes on CoffeeBeans:
  createIndexOnCoffeeBeans(transaction, COFFEEBEANS_NAMELOWERCASE_INDEX, true);
  createIndexOnCoffeeBeans(transaction, SOFTDELETIONTIMESTAMP_INDEX, false);
  // Create Recipes store:
  if (_db.objectStoreNames.contains(RECIPES_STORE) === false) {
    _db.createObjectStore(RECIPES_STORE, { keyPath: "id", autoIncrement: true });
  }
  // Create the indexes on Recipes:
  createIndexOnRecipes(transaction, RECIPES_COFFEEBEANSID_INDEX);
  createIndexOnRecipes(transaction, "outWeight");
  createIndexOnRecipes(transaction, "rating");
  createIndexOnRecipes(transaction, "timestamp");
  createIndexOnRecipes(transaction, SOFTDELETIONTIMESTAMP_INDEX);
  // Create EnhancedCoffeeBeans store:
  if (_db.objectStoreNames.contains(ENHANCEDCOFFEEBEANS_STORE) === false) {
    _db.createObjectStore(ENHANCEDCOFFEEBEANS_STORE, { keyPath: "id" });
  }
}

// Helper functions for "createStoresV3":

function createIndexOnCoffeeBeans(
  transaction: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "recipes" | "enhancedCoffeeBeans")[], "versionchange">,
  nameAndKeyPath: "nameLowerCase" | "softDeletionTimestamp",
  uniqueIndex: boolean
) {
  // Guard clause, if the index exists already:
  if (transaction.objectStore(COFFEEBEANS_STORE).indexNames.contains(nameAndKeyPath)) {
    return;
  }
  // Create an index:
  transaction.objectStore(COFFEEBEANS_STORE).createIndex(nameAndKeyPath, nameAndKeyPath, { unique: uniqueIndex });
}

function createIndexOnRecipes(
  transaction: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "recipes" | "enhancedCoffeeBeans")[], "versionchange">,
  nameAndKeyPath: "coffeeBeansId" | "outWeight" | "rating" | "timestamp" | "softDeletionTimestamp"
) {
  // Guard clause, if the index exists already:
  if (transaction.objectStore(RECIPES_STORE).indexNames.contains(nameAndKeyPath)) {
    return;
  }
  // Create an index:
  transaction.objectStore(RECIPES_STORE).createIndex(nameAndKeyPath, nameAndKeyPath, { unique: false });
}