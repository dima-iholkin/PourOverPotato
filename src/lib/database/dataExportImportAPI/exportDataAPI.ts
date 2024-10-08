import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { Recipe } from "$lib/domain/entities/Recipe";
import type { IDBPDatabase } from "idb";
import { openEntitiesDB, COFFEEBEANS_STORE, RECIPES_STORE } from "../core/core";
import type { EntitiesDbSchema } from "../core/EntitiesDbSchema";
import { type ICoffeeBeansDB, CoffeeBeansDB } from "../models/CoffeeBeansDB";
import { type IRecipeDB, RecipeDB } from "../models/RecipeDB";
import type { ExportJSON } from "./types/ExportJSON";

// Public functions:

export async function exportAllData(): Promise<Blob> {
  // Open a transaction:
  const db: IDBPDatabase<EntitiesDbSchema> = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE, RECIPES_STORE], "readonly");
  // Load the CoffeeBeans items, the Recipes and the DbVersion:
  const coffeeBeansDbItems: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE).getAll();
  const recipeDbItems: IRecipeDB[] = await tx.objectStore(RECIPES_STORE).getAll();
  const _dbVersion: number = tx.db.version;
  // Close the transaction:
  await tx.done;
  // Prepare the CoffeeBeans items and the Recipes:
  const coffeeBeansItems: CoffeeBeans[] = coffeeBeansDbItems
    .filter(itemDb => itemDb.softDeletionTimestamp === undefined)
    .map(itemDb => new CoffeeBeansDB(itemDb).toCoffeeBeans());
  const recipes: Recipe[] = recipeDbItems
    .filter(itemDb => itemDb.softDeletionTimestamp === undefined)
    .map(itemDb => new RecipeDB(itemDb).toRecipe());
  // Prepare the export data object:
  const exported: ExportJSON = {
    dbVersion: _dbVersion,
    coffeeBeans: coffeeBeansItems,
    recipes: recipes
  };
  // Serialize all data:
  const json = JSON.stringify(exported);
  return new Blob([json], { type: "application/json" });
}
