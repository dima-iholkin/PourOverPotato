import {
  COFFEEBEANS_STORE_NAME, RECIPES_INDEX_COFFEEBEANSID_NAME, RECIPES_STORE_NAME, openEntitiesDB
} from "../core/indexedDbCore";
import type { ICoffeeBeansDB } from "../types/CoffeeBeansDB";
import type { IRecipeDB } from "../types/RecipeDB";

export async function vacuumSoftDeletedCoffeeBeans(): Promise<void> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = await db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readwrite");
  // Load all CoffeeBeans items:
  const allCoffeeBeans: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE_NAME).getAll();
  // Filter only the soft deleted CoffeeBeans items:
  const coffeeBeans: ICoffeeBeansDB[] = allCoffeeBeans.filter(item => item.softDeleted === true);
  // Iterate over the soft deleted CoffeeBeans items:
  for (const item of coffeeBeans) {
    // Load the Recipes for the soft deleted CoffeeBeans item:
    const recipes: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME).index(RECIPES_INDEX_COFFEEBEANSID_NAME)
      .getAll(item.id);
    // Iterate over the Recipes and hard delete them:
    for (const recipeItem of recipes) {
      await tx.objectStore(RECIPES_STORE_NAME).delete(recipeItem.id);
    }
    // Hard delete the CoffeeBeans item:
    await tx.objectStore(COFFEEBEANS_STORE_NAME).delete(item.id);
  }
  await tx.done;
}

export async function vacuumSoftDeletedRecipes(): Promise<void> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = await db.transaction(RECIPES_STORE_NAME, "readwrite").objectStore(RECIPES_STORE_NAME);
  // Load the entities logic:
  const allRecipes: IRecipeDB[] = await tx.getAll();
  // Filter only the soft deleted Recipes:
  const recipes: IRecipeDB[] = allRecipes.filter(item => item.softDeleted === true);
  // Iterate over the soft deleted Recipes and hard delete them:
  for (const item of recipes) {
    await tx.delete(item.id);
  }
  await tx.transaction.done;
}