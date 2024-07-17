import type { IDBPTransaction } from "idb";
import { COFFEEBEANS_NAMELOWERCASE_INDEX, COFFEEBEANS_STORE, RECIPES_STORE } from "$lib/database/core/core";
import { CoffeeBeansDB, type ICoffeeBeansDB } from "$lib/database/types/CoffeeBeansDB";
import type { EntitiesDB } from "$lib/database/types/EntitiesDB";
import { RecipeDB, type IRecipeDB } from "$lib/database/types/RecipeDB";
import type { ICoffeeBeansDB_v1 } from "$lib/prevVersions/v1/database/CoffeeBeansDBv1";
import type { EntitiesDB_v1 } from "$lib/prevVersions/v1/database/EntitiesDBv1";
import type { IRecipeDB_v1 } from "$lib/prevVersions/v1/database/RecipeDBv1";
import type { ICoffeeBeansDB_v2 } from "$lib/prevVersions/v2/database/CoffeeBeansDBv2";
import type { EntitiesDB_v2 } from "$lib/prevVersions/v2/database/EntitiesDBv2";
import type { IRecipeDB_v2 } from "$lib/prevVersions/v2/database/RecipeDBv2";
import type { ICoffeeBeansDB_v3 } from "$lib/prevVersions/v3/database/CoffeeBeansDBv3";
import type { EntitiesDB_v3 } from "$lib/prevVersions/v3/database/EntitiesDBv3";

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
 * Makes the CoffeeBeans' index `nameLowerCase` unique again.
 */
export async function migrateCoffeeBeansV3ToV4(
  transaction: IDBPTransaction<EntitiesDB_v3, ("coffeeBeans" | "recipes")[], "versionchange">
) {
  // Guard clause:
  if (transaction.db.objectStoreNames.contains(COFFEEBEANS_STORE) === false) {
    return;
  }
  // Drop the non-unique index:
  if (transaction.objectStore(COFFEEBEANS_STORE).indexNames.contains(COFFEEBEANS_NAMELOWERCASE_INDEX)) {
    transaction.objectStore(COFFEEBEANS_STORE).deleteIndex(COFFEEBEANS_NAMELOWERCASE_INDEX);
  }
  // Rename the CoffeeBeans with duplicate names:
  const coffeeBeans: ICoffeeBeansDB_v3[] = await transaction.objectStore(COFFEEBEANS_STORE).getAll();
  const findDuplicates: Map<string, number> = new Map<string, number>();
  coffeeBeans.forEach((item) => {
    const mapValue: number | undefined = findDuplicates.get(item.nameLowerCase);
    if (mapValue === undefined) {
      findDuplicates.set(item.nameLowerCase, 0);
    } else {
      findDuplicates.set(item.nameLowerCase, mapValue + 1);
    }
  });
  for await (const [key, value] of findDuplicates) {
    // Guard clause:
    if (value < 2) {
      continue;
    }
    // Rename the duplicates:
    let greatestNum: number = coffeeBeans.filter(itemCB => itemCB.nameLowerCase.startsWith(key + "-"))
      .map(itemCB => itemCB.nameLowerCase.slice(key.length + 1))
      .map(str => Number(str))
      .filter(num => Number.isInteger(num))
      .sort()[-1]; // Sort ascending and get the greatest item.
    const duplicateItems: ICoffeeBeansDB_v3[] = coffeeBeans.filter(item => item.nameLowerCase === key);
    for await (const item of duplicateItems) {
      greatestNum++;
      const newName: string = item.name + "-" + greatestNum;
      // Prepare and save the changed CoffeeBeans item:
      const submitItem: ICoffeeBeansDB = new CoffeeBeansDB({
        ...item,
        nameLowerCase: newName.toLowerCase(),
        softDeletionTimestamp: undefined
      });
      await transaction.objectStore(COFFEEBEANS_STORE).put(submitItem);
    }
  }
  // Recreate the unique index:
  transaction.objectStore(COFFEEBEANS_STORE).createIndex(
    COFFEEBEANS_NAMELOWERCASE_INDEX, COFFEEBEANS_NAMELOWERCASE_INDEX, { unique: true }
  );
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