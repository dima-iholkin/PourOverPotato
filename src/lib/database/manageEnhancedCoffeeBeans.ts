import type { IDBPTransaction } from "idb";
import type { EnhancedCoffeeBeans } from "$lib/domain/enhancedEntities/EnhancedCoffeeBeans";
import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { Recipe } from "$lib/domain/entities/Recipe";
import { sortRecipesByTimestampDesc } from "$lib/domain/sort/sortRecipes";
import {
  COFFEEBEANS_STORE, ENHANCEDCOFFEEBEANS_STORE, RECIPES_COFFEEBEANSID_INDEX, RECIPES_STORE, openEntitiesDB
} from "./core/core";
import { CoffeeBeansDB, type ICoffeeBeansDB } from "./models/CoffeeBeansDB";
import { toEnhancedCoffeeBeans, type IEnhancedCoffeeBeansDB } from "./models/EnhancedCoffeeBeansDB";
import type { EntitiesDB } from "./models/EntitiesDB";
import { RecipeDB, type IRecipeDB } from "./models/RecipeDB";

export async function getAllEnhancedCoffeeBeans(): Promise<EnhancedCoffeeBeans[]> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE, ENHANCEDCOFFEEBEANS_STORE], "readonly");
  // Load the CoffeeBeans items:
  const coffeeBeansItemsDb: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE).getAll();
  // Prepare the core CoffeeBeans items:
  const coffeeBeansItems: CoffeeBeans[] = coffeeBeansItemsDb.filter(item => item.softDeletionTimestamp === undefined)
    .map(item => new CoffeeBeansDB(item).toCoffeeBeans());
  // Match the CoffeeBeans items with EnhancedCoffeeBeans info:
  const items: EnhancedCoffeeBeans[] = [];
  for (const coffeeBeansItem of coffeeBeansItems) {
    const itemDb: IEnhancedCoffeeBeansDB | undefined = await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE)
      .get(coffeeBeansItem.id);
    const info: Omit<IEnhancedCoffeeBeansDB, "id"> = {
      recipesCount: itemDb?.recipesCount ?? 0,
      latestRecipeTimestamp: itemDb?.latestRecipeTimestamp,
      earliestRecipeTimestamp: itemDb?.earliestRecipeTimestamp
    };
    const item: EnhancedCoffeeBeans = toEnhancedCoffeeBeans(coffeeBeansItem, info);
    items.push(item);
  }
  await tx.done;
  // Return the EnhancedCoffeeBeans items:
  return items;
}

export async function getEnhancedCoffeeBeansById(
  coffeeBeansId: number
): Promise<EnhancedCoffeeBeans | "EntityNotFound"> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE, ENHANCEDCOFFEEBEANS_STORE], "readonly");
  // Load the CoffeeBeans item:
  const coffeeBeansItemDb: ICoffeeBeansDB | undefined = await tx.objectStore(COFFEEBEANS_STORE).get(coffeeBeansId);
  // Guard clause:
  if (coffeeBeansItemDb === undefined || coffeeBeansItemDb.softDeletionTimestamp !== undefined) {
    return "EntityNotFound";
  }
  // Prepare the core CoffeeBeans item:
  const coffeeBeansItem: CoffeeBeans = new CoffeeBeansDB(coffeeBeansItemDb).toCoffeeBeans();
  // Load the EnhancedCoffeeBeans item:
  const itemDb: IEnhancedCoffeeBeansDB | undefined = await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE)
    .get(coffeeBeansId);
  await tx.done;
  // Prepare and return the EnhancedCoffeeBeans item:
  const info: Omit<IEnhancedCoffeeBeansDB, "id"> = {
    recipesCount: itemDb?.recipesCount ?? 0,
    latestRecipeTimestamp: itemDb?.latestRecipeTimestamp,
    earliestRecipeTimestamp: itemDb?.earliestRecipeTimestamp
  };
  const item: EnhancedCoffeeBeans = toEnhancedCoffeeBeans(coffeeBeansItem, info);
  return item;
}

export async function regenerateEnhancedCoffeeBeansItemById(
  coffeeBeansId: number,
  tx: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "readwrite" | "versionchange">
) {
  // Load the EnhancedCoffeeBeans item:
  let item: IEnhancedCoffeeBeansDB | undefined = await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE)
    .get(coffeeBeansId);
  // Load all Recipes by CoffeeBeansId:
  const recipesDB: IRecipeDB[] = await tx.objectStore(RECIPES_STORE)
    .index(RECIPES_COFFEEBEANSID_INDEX).getAll(coffeeBeansId);
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
  await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE).put(item);
}

export async function regenerateEnhancedCoffeeBeansTable(
  tx: IDBPTransaction<EntitiesDB, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "readwrite" | "versionchange">
) {
  // Guard clause:
  if (tx.db.objectStoreNames.contains(ENHANCEDCOFFEEBEANS_STORE) === false) {
    throw new Error(`Object store ${ENHANCEDCOFFEEBEANS_STORE} wasn't found.`);
  }
  // Empty the existing EnhancedCoffeeBeans table:
  await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE).clear();
  // Populate the EnhancedCoffeeBeans table by aggregating the Recipes data by CoffeeBeansId:
  const coffeeBeansItems: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE).getAll();
  for (const item of coffeeBeansItems) {
    await regenerateEnhancedCoffeeBeansItemById(item.id, tx);
  }
}