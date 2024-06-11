import { deleteDB as idb_deleteDB } from "idb";
import {
  COFFEEBEANS_STORE, DB_NAME, ENHANCEDCOFFEEBEANS_STORE, RECIPES_STORE, openEntitiesDB
} from "$lib/database/core/core";
import { regenerateEnhancedCoffeeBeansTable } from "$lib/database/manageEnhancedCoffeeBeans";
import { CoffeeBeansDBSubmit, type ICoffeeBeansDB } from "$lib/database/types/CoffeeBeansDB";
import { RecipeDBSubmit, type IRecipeDB } from "$lib/database/types/RecipeDB";
import { RecipeSubmit } from "$lib/domain/entities/Recipe";
import { DemoCoffeeBeans } from "./demo/demoCoffeeBeans";
import { generateDemoRecipesForCoffeeBeansId } from "./demo/demoRecipes";
import { vacuumSoftDeletedCoffeeBeans, vacuumSoftDeletedRecipes } from "./vacuum/vacuum";

// Public functions:

export async function deleteDB(): Promise<void> {
  // Delete the DB:
  await idb_deleteDB(DB_NAME);
}

export async function fillDbWithDemoData(): Promise<void | "TransactionAborted"> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE, RECIPES_STORE, ENHANCEDCOFFEEBEANS_STORE], "readwrite");
  // Iterate over demo CoffeeBeans items:
  for (const item of DemoCoffeeBeans) {
    // Prepare the CoffeeBeans item entity:
    const coffeeBeansItemDb = new CoffeeBeansDBSubmit(item);
    // Save the CoffeeBeans entity:
    let coffeeBeansId: number;
    try {
      coffeeBeansId = await tx.objectStore(COFFEEBEANS_STORE).add(coffeeBeansItemDb as ICoffeeBeansDB);
    }
    catch (error) {
      // Protect against an unlikely CoffeeBeans name collision:
      tx.abort();
      console.error(error);
      return "TransactionAborted";
    }
    // Generate the Recipes for this CoffeeBeansId:
    const recipes: RecipeSubmit[] = generateDemoRecipesForCoffeeBeansId(coffeeBeansId);
    // Iterate over demo Recipe items:
    for (const recipe of recipes) {
      // Prepare the Recipe entity:
      const recipeItemDb = new RecipeDBSubmit(recipe);
      // Save the Recipe entity:
      await tx.objectStore(RECIPES_STORE).add(recipeItemDb as unknown as IRecipeDB);
    }
  }
  await regenerateEnhancedCoffeeBeansTable(tx);
  await tx.done;
}

export async function vacuumSoftDeletedEntities(): Promise<void> {
  await vacuumSoftDeletedRecipes();
  await vacuumSoftDeletedCoffeeBeans();
}