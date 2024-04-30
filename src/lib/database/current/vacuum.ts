import { openEntitiesDB } from "./indexedDB";
import type { ICoffeeBeansDB } from "./types/CoffeeBeansDB";
import type { IRecipeDB } from "./types/RecipeDB";

export async function vacuumSoftDeletedCoffeeBeans(): Promise<void> {
  // Load the entities logic:
  const db = await openEntitiesDB();
  const coffeeBeans: ICoffeeBeansDB[] = await db.getAll("coffeeBeans");
  // Iterate and hard delete logic:
  for (const item of coffeeBeans) {
    if (item.softDeleted) {
      await db.delete("coffeeBeans", item.id);
    }
  }
}

export async function vacuumSoftDeletedRecipes(): Promise<void> {
  // Load the entities logic:
  const db = await openEntitiesDB();
  const recipes: IRecipeDB[] = await db.getAll("recipes");
  // Iterate and hard delete logic:
  for (const item of recipes) {
    if (item.softDeleted) {
      await db.delete("recipes", item.id);
    }
  }
}