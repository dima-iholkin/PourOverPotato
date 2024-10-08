import { openDB, type IDBPDatabase, type IDBPTransaction } from "idb";
import type { EntitiesDbSchema } from "$lib/database/core/EntitiesDbSchema";
import { regenerateEnhancedCoffeeBeansTable } from "$lib/database/manageEnhancedCoffeeBeans";
import type { EntitiesDB_v1 } from "$lib/prevVersions/v1/database/EntitiesDBv1";
import type { EntitiesDB_v2 } from "$lib/prevVersions/v2/database/EntitiesDBv2";
import type { EntitiesDB_v3 } from "$lib/prevVersions/v3/database/EntitiesDBv3";
import {
  migrateCoffeeBeansV1ToV5, migrateCoffeeBeansV2ToV5, migrateCoffeeBeansV3ToV5, migrateRecipesV1ToV5,
  migrateRecipesV2ToV5
} from "./migrations/migrations";

// Internal constant:
const DB_VERSION = 5;

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
export async function openEntitiesDB(): Promise<IDBPDatabase<EntitiesDbSchema>> {
  return await openDB<EntitiesDbSchema>(DB_NAME, DB_VERSION, {
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
            await migrateCoffeeBeansV1ToV5(_transaction);
            await migrateRecipesV1ToV5(_transaction);
            break;
          }
        case 2:
          {
            const _transaction =
              transaction as unknown as IDBPTransaction<EntitiesDB_v2, ("coffeeBeans" | "recipes")[], "versionchange">;
            await migrateCoffeeBeansV2ToV5(_transaction);
            await migrateRecipesV2ToV5(_transaction);
            break;
          }
        case 3:
          {
            const _transaction =
              transaction as unknown as IDBPTransaction<EntitiesDB_v3, ("coffeeBeans" | "recipes")[], "versionchange">;
            await migrateCoffeeBeansV3ToV5(_transaction);
            break;
          }
        case 4:
          {
            // v5 introduces 2 new fields for RecipeDB: "roastDate" and "bagNumber", however they are optional,
            // so there is no need to modify the existing records.
            break;
          }
        default:
          break;
      }
      // Create any missing object stores and indexes:
      createStoresV5(transaction);
      // Regenerate the EnhancedCoffeeBeans table:
      await regenerateEnhancedCoffeeBeansTable(transaction);
    }
  });
}

// Internal function:
function createStoresV5(
  transaction: IDBPTransaction<EntitiesDbSchema, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "versionchange">
): void {
  const _db: IDBPDatabase<EntitiesDbSchema> = transaction.db;
  // Create CoffeeBeans store:
  if (_db.objectStoreNames.contains(COFFEEBEANS_STORE) === false) {
    _db.createObjectStore(COFFEEBEANS_STORE, { keyPath: "id", autoIncrement: true });
  }
  // Create the indexes on CoffeeBeans:
  createIndexOnCoffeeBeans_nameLowerCase(transaction);
  createIndexOnCoffeeBeans_softDeletionTimestamp(transaction);
  // Create Recipes store:
  if (_db.objectStoreNames.contains(RECIPES_STORE) === false) {
    _db.createObjectStore(RECIPES_STORE, { keyPath: "id", autoIncrement: true });
  }
  // Create the indexes on Recipes:
  createIndexOnRecipes(transaction, RECIPES_COFFEEBEANSID_INDEX);
  createIndexOnRecipes(transaction, "roastDate");
  createIndexOnRecipes(transaction, "bagNumber");
  createIndexOnRecipes(transaction, "outWeight");
  createIndexOnRecipes(transaction, "rating");
  createIndexOnRecipes(transaction, "timestamp");
  createIndexOnRecipes(transaction, SOFTDELETIONTIMESTAMP_INDEX);
  // Create EnhancedCoffeeBeans store:
  if (_db.objectStoreNames.contains(ENHANCEDCOFFEEBEANS_STORE) === false) {
    _db.createObjectStore(ENHANCEDCOFFEEBEANS_STORE, { keyPath: "id" });
  }
}

// Helper functions for "createStoresV5":

function createIndexOnCoffeeBeans_nameLowerCase(
  transaction: IDBPTransaction<EntitiesDbSchema, ("coffeeBeans" | "recipes" | "enhancedCoffeeBeans")[], "versionchange">
) {
  // Guard clause, if the index exists already:
  if (transaction.objectStore(COFFEEBEANS_STORE).indexNames.contains(COFFEEBEANS_NAMELOWERCASE_INDEX)) {
    return;
  }
  // Create an index:
  transaction.objectStore(COFFEEBEANS_STORE).createIndex(
    COFFEEBEANS_NAMELOWERCASE_INDEX, COFFEEBEANS_NAMELOWERCASE_INDEX, { unique: true }
  );
}

function createIndexOnCoffeeBeans_softDeletionTimestamp(
  transaction: IDBPTransaction<EntitiesDbSchema, ("coffeeBeans" | "recipes" | "enhancedCoffeeBeans")[], "versionchange">
) {
  // Guard clause, if the index exists already:
  if (transaction.objectStore(COFFEEBEANS_STORE).indexNames.contains(SOFTDELETIONTIMESTAMP_INDEX)) {
    return;
  }
  // Create an index:
  transaction.objectStore(COFFEEBEANS_STORE).createIndex(
    SOFTDELETIONTIMESTAMP_INDEX, SOFTDELETIONTIMESTAMP_INDEX, { unique: false }
  );
}

function createIndexOnRecipes(
  // eslint-disable-next-line max-len
  transaction: IDBPTransaction<EntitiesDbSchema, ("coffeeBeans" | "recipes" | "enhancedCoffeeBeans")[], "versionchange">,
  // eslint-disable-next-line max-len
  nameAndKeyPath: "coffeeBeansId" | "roastDate" | "bagNumber" | "outWeight" | "rating" | "timestamp" | "softDeletionTimestamp"
) {
  // Guard clause, if the index exists already:
  if (transaction.objectStore(RECIPES_STORE).indexNames.contains(nameAndKeyPath)) {
    return;
  }
  // Create an index:
  transaction.objectStore(RECIPES_STORE).createIndex(nameAndKeyPath, nameAndKeyPath, { unique: false });
}