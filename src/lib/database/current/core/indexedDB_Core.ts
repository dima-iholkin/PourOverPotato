import { openDB, type IDBPDatabase, type IDBPTransaction } from "idb";
import { type IRecipeDB as IRecipeDB_v1 } from "../../v1/types/RecipeDB";
import type { EntitiesDB } from "../types/EntitiesDB";
import { type IRecipeDB } from "../types/RecipeDB";

// Internal constants:
const DB_NAME = "entities";
const DB_VERSION = 2;

// Public constants:
export const COFFEEBEANS_STORE_NAME = "coffeeBeans";
export const COFFEEBEANS_INDEX_NAME = "nameLowerCase";
export const RECIPES_STORE_NAME = "recipes";
export const RECIPES_INDEX_COFFEEBEANSID_NAME = "coffeeBeansId";

// Public function, the most important function:
export async function openEntitiesDB(): Promise<IDBPDatabase<EntitiesDB>> {
  return await openDB<EntitiesDB>(DB_NAME, DB_VERSION, {
    async upgrade(db, oldVersion, newVersion, transaction) {
      switch (oldVersion) {
        case 0:
          // This case means no DB existed before.
          createStores(db);
          break;
        case 1: {
          createStores(db); // Run in case for some reason the object store is missing.
          await migrateRecipeTimestampFromV1ToV2(db, transaction);
          break;
        }
        default:
          break;
      }
    }
  });
}

// Internal functions:

function createStores(db: IDBPDatabase<EntitiesDB>): void {
  // Create CoffeeBeans store:
  if (db.objectStoreNames.contains(COFFEEBEANS_STORE_NAME) === false) {
    const coffeeBeansStore = db.createObjectStore(COFFEEBEANS_STORE_NAME, { keyPath: "id", autoIncrement: true });
    coffeeBeansStore.createIndex(COFFEEBEANS_INDEX_NAME, COFFEEBEANS_INDEX_NAME, { unique: true });
  }
  // Create Recipes store:
  if (db.objectStoreNames.contains(RECIPES_STORE_NAME) === false) {
    const recipesStore = db.createObjectStore(RECIPES_STORE_NAME, { keyPath: "id", autoIncrement: true });
    recipesStore.createIndex(RECIPES_INDEX_COFFEEBEANSID_NAME, RECIPES_INDEX_COFFEEBEANSID_NAME, { unique: false });
    recipesStore.createIndex("outWeight", "outWeight", { unique: false });
    recipesStore.createIndex("rating", "rating", { unique: false });
    recipesStore.createIndex("timestamp", "timestamp", { unique: false });
  }
}

/**
 * Converts each Recipe's "timestamp" field from Date to number.
 */
async function migrateRecipeTimestampFromV1ToV2(
  db: IDBPDatabase<EntitiesDB>,
  transaction: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "recipes")[], "versionchange">
): Promise<void> {
  // Load all Recipes:
  // @ts-ignore
  const recipesFromV1: IRecipeDB_v1[] = await transaction.objectStore(RECIPES_STORE_NAME).getAll();
  // Prepare all Recipes:
  for (const itemV1 of recipesFromV1) {
    const recipeNew: IRecipeDB = {
      ...itemV1,
      favorite: false,
      timestamp: itemV1.timestamp.getTime(),
      softDeleted: false
    };
    // Save all modified Recipes:
    await transaction.objectStore(RECIPES_STORE_NAME).put(recipeNew);
  }
}

// TODO:
// async function migrateCoffeeBeansSoftDeletedFromV2ToV3() {}

// TODO:
// async function migrateRecipesSoftDeletedAndFavoriteFromV2ToV3() {}