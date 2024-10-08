import { deleteDB as idb_deleteDB } from "idb";
import {
  COFFEEBEANS_STORE, DB_NAME, ENHANCEDCOFFEEBEANS_STORE, RECIPES_STORE, openEntitiesDB
} from "$lib/database/core/core";
import { regenerateEnhancedCoffeeBeansTable } from "$lib/database/enhancedCoffeeBeansAPI";
import { CoffeeBeansDBSubmit, type ICoffeeBeansDB } from "$lib/database/models/CoffeeBeansDB";
import { RecipeDBSubmit, type IRecipeDB } from "$lib/database/models/RecipeDB";
import { RecipeSubmit } from "$lib/domain/entities/Recipe";
import { DemoCoffeeBeans } from "./demo/demoCoffeeBeans";
import { generateDemoRecipesForCoffeeBeansId } from "./demo/demoRecipes";
import { vacuumSoftDeletedCoffeeBeans, vacuumSoftDeletedRecipes } from "./vacuum/vacuum";

// Public functions:

export async function deleteDB(): Promise<void> {
  await idb_deleteDB(DB_NAME);
}

export async function fillDbWithDemoData(): Promise<void | "TransactionAborted"> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE, RECIPES_STORE, ENHANCEDCOFFEEBEANS_STORE], "readwrite");
  // Prepare and save the new demo CoffeeBeans items:
  for (const item of DemoCoffeeBeans) {
    const coffeeBeansItemDb = new CoffeeBeansDBSubmit(item);
    let coffeeBeansId: number;
    try {
      coffeeBeansId = await tx.objectStore(COFFEEBEANS_STORE).add(coffeeBeansItemDb as ICoffeeBeansDB);
    }
    catch (error) {
      // Defend against an unlikely CoffeeBeans name collision:
      tx.abort();
      console.error(error);
      return "TransactionAborted";
    }
    // Generate the demo Recipes for this CoffeeBeansId:
    const recipes: RecipeSubmit[] = generateDemoRecipesForCoffeeBeansId(coffeeBeansId);
    // Prepare and save the new demo Recipes for this CoffeeBeansId:
    for (const recipe of recipes) {
      const recipeItemDb = new RecipeDBSubmit(recipe);
      await tx.objectStore(RECIPES_STORE).add(recipeItemDb as unknown as IRecipeDB);
    }
  }
  // Generate the EnhancedCoffeeBeans table:
  await regenerateEnhancedCoffeeBeansTable(tx);
  await tx.done;
}

export async function vacuumSoftDeletedEntities(): Promise<void> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE, RECIPES_STORE, ENHANCEDCOFFEEBEANS_STORE], "readwrite");
  // Vacuum the soft-deleted Recipes and CoffeeBeans items:
  await vacuumSoftDeletedRecipes(tx);
  await vacuumSoftDeletedCoffeeBeans(tx);
  // Close the transaction:
  await tx.done;
}