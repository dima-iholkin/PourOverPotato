import type { Recipe, RecipeSubmit } from "$lib/domain/entities/Recipe";
import { openEntitiesDB, RECIPES_INDEX_COFFEEBEANSID_NAME, RECIPES_STORE_NAME } from "./core/indexedDB_Core";
import { RecipeDB, type IRecipeDB, RecipeDBSubmit } from "./types/RecipeDB";

// Public functions:

export async function addRecipe(recipeSubmit: RecipeSubmit): Promise<Recipe> {
  // Prepare the entity for submit:
  const recipeDbSubmit: RecipeDBSubmit = new RecipeDBSubmit(recipeSubmit);
  // Save the new Recipe:
  const db = await openEntitiesDB();
  const id: number = await db.add(RECIPES_STORE_NAME, recipeDbSubmit as unknown as IRecipeDB);
  // Prepare to return the saved entity:
  const recipeDbSaved: RecipeDB = new RecipeDB({ ...recipeDbSubmit, id });
  return recipeDbSaved.toRecipe();
}

export async function anyRecipes(): Promise<boolean> {
  const db = await openEntitiesDB();
  const count: number = await db.count(RECIPES_STORE_NAME);
  return count > 0;
}

export async function countRecipesByCoffeeBeansId(coffeeBeansId: number): Promise<number> {
  // Load the entities from the DB:
  const db = await openEntitiesDB();
  const itemsDB: IRecipeDB[] = await db.getAllFromIndex(
    RECIPES_STORE_NAME, RECIPES_INDEX_COFFEEBEANSID_NAME, coffeeBeansId
  );
  // Filter out the soft deleted entities and count the valid Recipes:
  const count: number = itemsDB.filter(item => item.softDeleted === undefined || item.softDeleted === false).length;
  return count;
}

export async function editRecipe(submitItem: Recipe): Promise<Recipe> {
  // Prepare the entity for submit:
  const dbSubmitItem: RecipeDB = RecipeDB.fromRecipe(submitItem);
  // Save the edited entity:
  const db = await openEntitiesDB();
  await db.put(RECIPES_STORE_NAME, dbSubmitItem);
  // Prepare and return the saved entity:
  return dbSubmitItem.toRecipe();
}

export async function getAllRecipes(): Promise<Recipe[]> {
  // Load the entities from the DB:
  const db = await openEntitiesDB();
  const itemsDB: IRecipeDB[] = await db.getAll(RECIPES_STORE_NAME);
  // Filter out the soft deleted entities and convert to core Recipe entities:
  const items: Recipe[] = itemsDB
    .filter(item => item.softDeleted === undefined || item.softDeleted === false)
    .map(item => new RecipeDB(item).toRecipe());
  return items;
}

export async function getRecipeById(recipeId: number): Promise<Recipe | undefined> {
  // Load the entity from the DB:
  const db = await openEntitiesDB();
  const item: IRecipeDB | undefined = await db.get(RECIPES_STORE_NAME, recipeId);
  // Ignore the soft deleted Recipes:
  if (item === undefined || (item.softDeleted && item.softDeleted === true)) {
    return undefined;
  }
  // Prepare and return a core Recipe entity:
  return new RecipeDB(item).toRecipe();
}

export async function getRecipesByCoffeeBeansId(coffeeBeansId: number): Promise<Recipe[]> {
  // Load the entities from the DB:
  const db = await openEntitiesDB();
  const itemsDB: IRecipeDB[] = await db.getAllFromIndex(
    RECIPES_STORE_NAME, RECIPES_INDEX_COFFEEBEANSID_NAME, coffeeBeansId
  );
  // Filter out the soft deleted entities and convert to core Recipe entities:
  const items: Recipe[] = itemsDB
    .filter(item => item.softDeleted === undefined || item.softDeleted === false)
    .map(item => new RecipeDB(item).toRecipe());
  return items;
}

export async function hardDeleteRecipeById(recipeId: number): Promise<void> {
  const db = await openEntitiesDB();
  await db.delete(RECIPES_STORE_NAME, recipeId);
}

export async function softDeleteRecipeById(recipeId: number): Promise<"Success" | "RecipeNotFound"> {
  // Start a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction(RECIPES_STORE_NAME, "readwrite").objectStore(RECIPES_STORE_NAME);
  // Load the entity from the DB:
  const dbItem: IRecipeDB | undefined = await tx.get(recipeId);
  // Guard clause:
  if (dbItem === undefined) {
    return "RecipeNotFound";
  }
  // Prepare the entity for submit:
  dbItem.softDeleted = true;
  // Save the soft deleted entity:
  await tx.put(dbItem);
  await tx.transaction.done;
  return "Success";
}

export async function undoSoftDeleteRecipeById(recipeId: number): Promise<"Success" | "RecipeNotFound"> {
  // Start a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction(RECIPES_STORE_NAME, "readwrite").objectStore(RECIPES_STORE_NAME);
  // Load the entity from the DB:
  const dbItem: IRecipeDB | undefined = await tx.get(recipeId);
  // Guard clause:
  if (dbItem === undefined) {
    return "RecipeNotFound";
  }
  // Prepare the entity for submit:
  dbItem.softDeleted = false;
  // Save the restored entity:
  await tx.put(dbItem);
  await tx.transaction.done;
  return "Success";
}