import {
  COFFEEBEANS_STORE_NAME, ENHANCEDCOFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME, openEntitiesDB
} from "$lib/database/core/core";
import { regenerateEnhancedCoffeeBeansTable } from "$lib/database/manageEnhancedCoffeeBeans";
import { CoffeeBeansDBSubmit, type ICoffeeBeansDB } from "$lib/database/types/CoffeeBeansDB";
import { RecipeDBSubmit, type IRecipeDB } from "$lib/database/types/RecipeDB";
import { RecipeSubmit } from "$lib/domain/entities/Recipe";
import { DemoCoffeeBeans } from "./demo/demoCoffeeBeans";
import { generateDemoRecipesForCoffeeBeansId } from "./demo/demoRecipes";
import { vacuumSoftDeletedCoffeeBeans, vacuumSoftDeletedRecipes } from "./vacuum/vacuum";

// Public functions:

export async function deleteAllData(): Promise<void> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME, ENHANCEDCOFFEEBEANS_STORE_NAME], "readwrite");
  // Delete all entities:
  await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE_NAME).clear();
  await tx.objectStore(RECIPES_STORE_NAME).clear();
  await tx.objectStore(COFFEEBEANS_STORE_NAME).clear();
  await tx.done;
}

export async function fillDbWithDemoData(): Promise<void | "TransactionAborted"> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME, ENHANCEDCOFFEEBEANS_STORE_NAME], "readwrite");
  // Iterate over demo CoffeeBeans items:
  for (const item of DemoCoffeeBeans) {
    // Prepare the CoffeeBeans item entity:
    const coffeeBeansItemDb = new CoffeeBeansDBSubmit(item);
    // Save the CoffeeBeans entity:
    let coffeeBeansId: number;
    try {
      coffeeBeansId = await tx.objectStore(COFFEEBEANS_STORE_NAME).add(coffeeBeansItemDb as ICoffeeBeansDB);
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
      await tx.objectStore(RECIPES_STORE_NAME).add(recipeItemDb as unknown as IRecipeDB);
    }
  }
  await regenerateEnhancedCoffeeBeansTable(tx);
  await tx.done;
}

export async function vacuumSoftDeletedEntities(): Promise<void> {
  await vacuumSoftDeletedRecipes();
  await vacuumSoftDeletedCoffeeBeans();
}