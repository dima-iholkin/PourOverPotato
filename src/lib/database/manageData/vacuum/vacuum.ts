import type { IDBPTransaction } from "idb";
import {
  COFFEEBEANS_STORE, ENHANCEDCOFFEEBEANS_STORE, RECIPES_COFFEEBEANSID_INDEX, RECIPES_STORE, SOFTDELETIONTIMESTAMP_INDEX
} from "$lib/database/core/core";
import type { EntitiesDbSchema } from "$lib/database/core/EntitiesDbSchema";
import type { ICoffeeBeansDB } from "$lib/database/models/CoffeeBeansDB";
import type { IRecipeDB } from "$lib/database/models/RecipeDB";

export async function vacuumSoftDeletedCoffeeBeans(
  tx: IDBPTransaction<EntitiesDbSchema, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "readwrite">
): Promise<void> {
  // Load the soft-deleted CoffeeBeans items:
  const softDeletedCoffeeBeans: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE)
    .index(SOFTDELETIONTIMESTAMP_INDEX).getAll();
  for (const item of softDeletedCoffeeBeans) {
    // Load the Recipes:
    const recipes: IRecipeDB[] = await tx.objectStore(RECIPES_STORE).index(RECIPES_COFFEEBEANSID_INDEX).getAll(item.id);
    // Hard-delete the Recipes:
    for (const recipeItem of recipes) {
      await tx.objectStore(RECIPES_STORE).delete(recipeItem.id);
    }
    // Hard-delete the CoffeeBeans item:
    await tx.objectStore(COFFEEBEANS_STORE).delete(item.id);
    // Hard-delete the EnhancedCoffeeBeans item:
    await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE).delete(item.id);
  }
}

export async function vacuumSoftDeletedRecipes(
  tx: IDBPTransaction<EntitiesDbSchema, ("coffeeBeans" | "enhancedCoffeeBeans" | "recipes")[], "readwrite">
): Promise<void> {
  // Load the soft-deleted Recipes:
  const softDeletedRecipes: IRecipeDB[] = await tx.objectStore(RECIPES_STORE).index(SOFTDELETIONTIMESTAMP_INDEX)
    .getAll();
  // Hard-delete the Recipes:
  for (const item of softDeletedRecipes) {
    await tx.objectStore(RECIPES_STORE).delete(item.id);
  }
}