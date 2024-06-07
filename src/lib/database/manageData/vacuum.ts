import {
  COFFEEBEANS_STORE_NAME, ENHANCEDCOFFEEBEANS_STORE_NAME, RECIPES_INDEX_COFFEEBEANSID_NAME, RECIPES_STORE_NAME,
  openEntitiesDB
} from "$lib/database/core/indexedDbCore";
import type { ICoffeeBeansDB } from "$lib/database/types/CoffeeBeansDB";
import type { IRecipeDB } from "$lib/database/types/RecipeDB";

export async function vacuumSoftDeletedCoffeeBeans(): Promise<void> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME, ENHANCEDCOFFEEBEANS_STORE_NAME], "readwrite");
  // Load the soft-deleted CoffeeBeans items:
  const softDeletedCoffeeBeans: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE_NAME)
    .index("softDeletionTimestamp").getAll();
  // Iterate over the soft-deleted CoffeeBeans items:
  for (const item of softDeletedCoffeeBeans) {
    // Load the Recipes for the CoffeeBeans item:
    const recipes: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME).index(RECIPES_INDEX_COFFEEBEANSID_NAME)
      .getAll(item.id);
    // Hard-delete the Recipes:
    for (const recipeItem of recipes) {
      await tx.objectStore(RECIPES_STORE_NAME).delete(recipeItem.id);
    }
    // Hard-delete the CoffeeBeans item:
    await tx.objectStore(COFFEEBEANS_STORE_NAME).delete(item.id);
    // Hard-delete from the EnhancedCoffeeBeans table:
    await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE_NAME).delete(item.id);
  }
  await tx.done;
}

export async function vacuumSoftDeletedRecipes(): Promise<void> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction(RECIPES_STORE_NAME, "readwrite");
  // Load the soft-deleted Recipes:
  const softDeletedRecipes: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME).index("softDeletionTimestamp")
    .getAll();
  // Hard-delete the Recipes:
  for (const item of softDeletedRecipes) {
    await tx.objectStore(RECIPES_STORE_NAME).delete(item.id);
  }
  await tx.done;
}