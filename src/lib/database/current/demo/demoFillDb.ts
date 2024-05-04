import type { RecipeSubmit } from "$lib/domain/entities/Recipe";
import { COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME, openEntitiesDB } from "../indexedDB_Core";
import { CoffeeBeansDBSubmit, type ICoffeeBeansDB } from "../types/CoffeeBeansDB";
import { RecipeDBSubmit, type IRecipeDB } from "../types/RecipeDB";
import { devCoffeeBeans } from "./data/demoCoffeeBeans";
import { generateDemoRecipes } from "./data/demoRecipes";

export async function demoFillDB() {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = await db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readwrite");
  // Iterate over demo CoffeeBeans items:
  for (const item of devCoffeeBeans) {
    // Prepare a CoffeeBeans item:
    const coffeeBeansItemDb = new CoffeeBeansDBSubmit(item);
    // Save the demo CoffeeBeans items:
    // Protect against an unlikely CoffeeBeans name collision:
    try {
      const coffeeBeansId: number = await tx.objectStore(COFFEEBEANS_STORE_NAME)
        .add(coffeeBeansItemDb as ICoffeeBeansDB);
      // Save the demo Recipes:
      const recipes: RecipeSubmit[] = generateDemoRecipes(coffeeBeansId);
      for (const recipe of recipes) {
        const recipeItemDb = new RecipeDBSubmit(recipe)
        await tx.objectStore(RECIPES_STORE_NAME).add(recipeItemDb as unknown as IRecipeDB);
      }
      await tx.done;
    }
    catch (error) {
      console.error(error);
    }
  }
}