import type { Recipe, RecipeSubmit } from "$lib/domain/entities/Recipe";
import { ENHANCEDCOFFEEBEANS_STORE, openEntitiesDB, RECIPES_COFFEEBEANSID_INDEX, RECIPES_STORE } from "./core/core";
import { regenerateEnhancedCoffeeBeansItemById } from "./manageEnhancedCoffeeBeans";
import { RecipeDB, type IRecipeDB, RecipeDBSubmit } from "./types/RecipeDB";

// Public functions:

export async function addRecipe(item: RecipeSubmit): Promise<Recipe> {
  // Prepare the new Recipe:
  const itemDbSubmit: RecipeDBSubmit = new RecipeDBSubmit(item);
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([RECIPES_STORE, ENHANCEDCOFFEEBEANS_STORE], "readwrite");
  // Save the new Recipe:
  const id: number = await tx.objectStore(RECIPES_STORE).add(itemDbSubmit as unknown as IRecipeDB);
  // Regenerate the EnhancedCoffeeBeans item:
  await regenerateEnhancedCoffeeBeansItemById(item.coffeeBeansId, tx);
  await tx.done;
  // Prepare and return the saved Recipe:
  const itemDbSaved: RecipeDB = new RecipeDB({ ...itemDbSubmit, id });
  return itemDbSaved.toRecipe();
}

export async function anyRecipes(): Promise<boolean> {
  const db = await openEntitiesDB();
  const count: number = await db.count(RECIPES_STORE);
  return count > 0;
}

export async function editRecipe(item: Recipe): Promise<Recipe> {
  // Prepare the changed Recipe:
  const itemDbSubmit: RecipeDB = RecipeDB.fromRecipe(item);
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([RECIPES_STORE, ENHANCEDCOFFEEBEANS_STORE], "readwrite");
  // Save the changed Recipe:
  await tx.objectStore(RECIPES_STORE).put(itemDbSubmit);
  // Regenerate the EnhancedCoffeeBeans item:
  await regenerateEnhancedCoffeeBeansItemById(item.coffeeBeansId, tx);
  await tx.done;
  // Prepare and return the saved Recipe:
  return itemDbSubmit.toRecipe();
}

export async function getAllRecipes(): Promise<Recipe[]> {
  // Load the Recipes:
  const db = await openEntitiesDB();
  const itemsDB: IRecipeDB[] = await db.getAll(RECIPES_STORE);
  // Prepare and return the Recipes:
  const items: Recipe[] = itemsDB.filter(item => item.softDeletionTimestamp === undefined)
    .map(item => new RecipeDB(item).toRecipe());
  return items;
}

export async function getRecipeById(recipeId: number): Promise<Recipe | undefined> {
  // Load the Recipe:
  const db = await openEntitiesDB();
  const item: IRecipeDB | undefined = await db.get(RECIPES_STORE, recipeId);
  // Guard clause, check if not found or soft-deleted Recipe:
  if (item === undefined || item.softDeletionTimestamp) {
    return undefined;
  }
  // Prepare and return the Recipe:
  return new RecipeDB(item).toRecipe();
}

export async function getRecipesByCoffeeBeansId(coffeeBeansId: number): Promise<Recipe[]> {
  // Load the Recipes:
  const db = await openEntitiesDB();
  const itemsDB: IRecipeDB[] = await db.getAllFromIndex(
    RECIPES_STORE, RECIPES_COFFEEBEANSID_INDEX, coffeeBeansId
  );
  // Prepare and return the Recipes:
  const items: Recipe[] = itemsDB.filter(item => item.softDeletionTimestamp === undefined)
    .map(item => new RecipeDB(item).toRecipe());
  return items;
}

export async function hardDeleteRecipeById(recipeId: number): Promise<void> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([RECIPES_STORE, ENHANCEDCOFFEEBEANS_STORE], "readwrite");
  // Load the Recipe:
  const recipe: IRecipeDB | undefined = await tx.objectStore(RECIPES_STORE).get(recipeId);
  // Guard clause:
  if (recipe === undefined) {
    return;
  }
  // Hard-delete the Recipe:
  await tx.objectStore(RECIPES_STORE).delete(recipeId);
  // Regenerate the EnhancedCoffeeBeans item:
  await regenerateEnhancedCoffeeBeansItemById(recipe.coffeeBeansId, tx);
  await tx.done;
}

export async function softDeleteRecipeById(recipeId: number): Promise<"Success" | "RecipeNotFound"> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([RECIPES_STORE, ENHANCEDCOFFEEBEANS_STORE], "readwrite");
  // Load the Recipe:
  const item: IRecipeDB | undefined = await tx.objectStore(RECIPES_STORE).get(recipeId);
  // Guard clause:
  if (item === undefined) {
    return "RecipeNotFound";
  }
  // Prepare and save the soft-deleted Recipe:
  item.softDeletionTimestamp = Date.now();
  await tx.objectStore(RECIPES_STORE).put(item);
  // Regenerate the EnhancedCoffeeBeans item:
  await regenerateEnhancedCoffeeBeansItemById(item.coffeeBeansId, tx);
  await tx.done;
  return "Success";
}

export async function undoSoftDeleteRecipeById(recipeId: number): Promise<"Success" | "RecipeNotFound"> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([RECIPES_STORE, ENHANCEDCOFFEEBEANS_STORE], "readwrite");
  // Load the Recipe:
  const item: IRecipeDB | undefined = await tx.objectStore(RECIPES_STORE).get(recipeId);
  // Guard clause:
  if (item === undefined) {
    return "RecipeNotFound";
  }
  // Prepare and restore the soft-deleted Recipe:
  item.softDeletionTimestamp = undefined;
  await tx.objectStore(RECIPES_STORE).put(item);
  // Regenerate the EnhancedCoffeeBeans item:
  await regenerateEnhancedCoffeeBeansItemById(item.coffeeBeansId, tx);
  await tx.done;
  return "Success";
}