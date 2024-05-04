import {
  CoffeeBeans, type CoffeeBeansCreateSubmit, type CoffeeBeansEditSubmit
} from "$lib/domain/entities/CoffeeBeans";
import {
  COFFEEBEANS_INDEX_NAME, COFFEEBEANS_STORE_NAME, RECIPES_INDEX_COFFEEBEANSID_NAME, RECIPES_STORE_NAME, openEntitiesDB
} from "../indexedDB_Core";
import { CoffeeBeansDB, CoffeeBeansDBSubmit, type ICoffeeBeansDB } from "../types/CoffeeBeansDB";
import type { Count } from "../types/Count";
import type { IRecipeDB } from "../types/RecipeDB";

// Public functions:

export async function addCoffeeBeans(item: CoffeeBeansCreateSubmit):
  Promise<CoffeeBeans | "Failure_NameAlreadyExist" | "DatabaseError"> {
  // Open the DB transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction(COFFEEBEANS_STORE_NAME, "readwrite").objectStore(COFFEEBEANS_STORE_NAME);
  // Check that a CoffeeBeans record with the same Name property doesn't exist:
  const dbItem: ICoffeeBeansDB | undefined = await tx.index("nameLowerCase").get(item.name.toLowerCase());
  if (dbItem) {
    return "Failure_NameAlreadyExist";
  }
  // The happy path:
  const itemDBSubmit: CoffeeBeansDBSubmit = new CoffeeBeansDBSubmit(item);
  try {
    // Save and get the Id inserted into the DB:
    const id = await tx.add(itemDBSubmit as ICoffeeBeansDB);
    await tx.transaction.done;
    // Prepare and return the saved CoffeeBeans:
    const itemDBsaved = new CoffeeBeansDB({ ...itemDBSubmit, id });
    return itemDBsaved.toCoffeeBeans();
  } catch (error) {
    // Protect from errors during save:
    if (error instanceof DOMException && error.name === "ConstraintError") {
      const message =
        `A ConstraintError occurred while saving CoffeeBeans "${item.name}" to the database.
         It seems a CoffeeBeans with the same name already exist.`;
      console.error(message, error);
      return "Failure_NameAlreadyExist";
    } else {
      console.error(error);
      return "DatabaseError";
    }
  }
}

export async function anyCoffeeBeans(): Promise<boolean> {
  const db = await openEntitiesDB();
  const count: number = await db.count(COFFEEBEANS_STORE_NAME);
  return count > 0;
}

export async function editCoffeeBeans(submitItem: CoffeeBeansEditSubmit):
  Promise<CoffeeBeans | "Failure_NameAlreadyExist" | "CoffeeBeansNotFound"> {
  // Open the DB transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction(COFFEEBEANS_STORE_NAME, "readwrite").objectStore(COFFEEBEANS_STORE_NAME);
  // Load the present DB version of CoffeeBeans item:
  const presentDbItem: ICoffeeBeansDB | undefined = await tx.get(submitItem.id);
  // Guard clause, check if the edited CoffeeBeans entity exists in the DB:
  if (presentDbItem === undefined) {
    console.error(
      `The edited CoffeeBeans item ${JSON.stringify(submitItem)} wasn't found in the database. Edit operation aborted.`
    );
    return "CoffeeBeansNotFound";
  }
  // Check if the Name was edited:
  if (submitItem.name.toLowerCase() !== presentDbItem.nameLowerCase) {
    // Make sure it's not going to be a name collision:
    const dbItemWithNameCollision: ICoffeeBeansDB | undefined = await tx.index(COFFEEBEANS_INDEX_NAME).get(
      submitItem.name.toLowerCase()
    );
    if (dbItemWithNameCollision) {
      await tx.transaction.done;
      return "Failure_NameAlreadyExist";
    }
  }
  // The happy path:
  // Prepare the entity:
  const dbSubmitItem: ICoffeeBeansDB = new CoffeeBeansDB({
    ...submitItem,
    nameLowerCase: submitItem.name.toLowerCase(),
    softDeleted: false
  });
  // Save the edited entity:
  await tx.put(dbSubmitItem);
  await tx.transaction.done;
  // Return the prepared entity:
  return new CoffeeBeans(dbSubmitItem);
}

export async function getAllCoffeeBeans(): Promise<CoffeeBeans[]> {
  // Load the CoffeeBeans from DB:
  const db = await openEntitiesDB();
  const itemsDB: ICoffeeBeansDB[] = await db.getAll(COFFEEBEANS_STORE_NAME);
  // Filter out the soft deleted CoffeeBeans, convert to the core CoffeeBeans entities:
  const items: CoffeeBeans[] = itemsDB
    .filter(item => item.softDeleted === undefined || item.softDeleted === false)
    .map(item => new CoffeeBeansDB(item).toCoffeeBeans());
  // Return them:
  return items;
}

export async function getCoffeeBeansById(id: number): Promise<CoffeeBeans | undefined> {
  // Load the CoffeeBeans from DB:
  const db = await openEntitiesDB();
  const item: ICoffeeBeansDB | undefined = await db.get(COFFEEBEANS_STORE_NAME, id);
  // Return undefined, if not found or soft deleted:
  if (item === undefined || (item.softDeleted && item.softDeleted === true)) {
    return undefined;
  }
  // The happy path, return the core CoffeeBeans entity:
  return new CoffeeBeansDB(item).toCoffeeBeans();
}

export async function getCoffeeBeansByName(name: string): Promise<CoffeeBeans | undefined> {
  // Load the CoffeeBeans from DB:
  const db = await openEntitiesDB();
  const item: ICoffeeBeansDB | undefined = await db.getFromIndex(
    COFFEEBEANS_STORE_NAME, COFFEEBEANS_INDEX_NAME, name.toLowerCase()
  );
  // Return undefined, if not found or soft deleted:
  if (item === undefined || (item.softDeleted && item.softDeleted === true)) {
    return undefined;
  }
  // The happy path, return the core CoffeeBeans entity:
  return new CoffeeBeansDB(item).toCoffeeBeans();
}

export async function hardDeleteCoffeeBeansAndRecipesById(coffeeBeansId: number): Promise<Count> {
  let recipesCount = 0;
  // Open the transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readwrite");
  // Get all Recipes by CoffeeBeansId:
  const items: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME).index(RECIPES_INDEX_COFFEEBEANSID_NAME)
    .getAll(coffeeBeansId);
  // Delete all Recipes with this CoffeeBeansId:
  for (const item of items) {
    await tx.objectStore(RECIPES_STORE_NAME).delete(item.id);
    recipesCount++;
  }
  // Delete the CoffeeBeans item:
  tx.objectStore(COFFEEBEANS_STORE_NAME).delete(coffeeBeansId);
  await tx.done;
  // Return the deletion count:
  return {
    coffeeBeansCount: 1,
    recipesCount: recipesCount
  };
}

export async function softDeleteCoffeeBeansAndRecipesById(coffeeBeansId: number):
  Promise<Count | "CoffeeBeansNotFound"> {
  let recipesCount = 0;
  // Open the transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readwrite");
  // Get the CoffeeBeans item:
  const coffeeBeansItem: ICoffeeBeansDB | undefined = await tx.objectStore(COFFEEBEANS_STORE_NAME).get(coffeeBeansId);
  if (coffeeBeansItem === undefined) {
    await tx.done;
    return "CoffeeBeansNotFound";
  }
  // Get all Recipes by CoffeeBeansId:
  const recipeItems: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME).index(RECIPES_INDEX_COFFEEBEANSID_NAME)
    .getAll(coffeeBeansId);
  // Soft delete all Recipes with this CoffeeBeansId:
  for (const item of recipeItems) {
    // Ignore Recipe items that are already soft deleted:
    if (item.softDeleted) {
      continue;
    }
    // Prepare the Recipe item:
    item.softDeleted = true;
    // Update the Recipe item in the DB:
    await tx.objectStore(RECIPES_STORE_NAME).put(item);
    recipesCount++;
  }
  // Prepare the CoffeeBeans item:
  coffeeBeansItem.softDeleted = true;
  // Soft delete the CoffeeBeans item:
  tx.objectStore(COFFEEBEANS_STORE_NAME).put(coffeeBeansItem);
  await tx.done;
  // Return the soft deletion count:
  return {
    coffeeBeansCount: 1,
    recipesCount: recipesCount
  };
}

export async function undoSoftDeleteCoffeeBeansAndRecipesById(coffeeBeansId: number):
  Promise<Count | "CoffeeBeansNotFound"> {
  let recipesCount = 0;
  // Open the transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readwrite");
  // Get the CoffeeBeans item:
  const coffeeBeansItem: ICoffeeBeansDB | undefined = await tx.objectStore(COFFEEBEANS_STORE_NAME).get(coffeeBeansId);
  // Guard clause:
  if (coffeeBeansItem === undefined) {
    await tx.done;
    return "CoffeeBeansNotFound";
  }
  // Prepare the CoffeeBeans item:
  coffeeBeansItem.softDeleted = false;
  // Undo soft delete for the CoffeeBeans item:
  tx.objectStore(COFFEEBEANS_STORE_NAME).put(coffeeBeansItem);
  // Get all Recipes by CoffeeBeansId:
  const recipeItems: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME).index(RECIPES_INDEX_COFFEEBEANSID_NAME)
    .getAll(coffeeBeansId);
  // Undo soft delete for all Recipes with this CoffeeBeansId:
  for (const recipeItem of recipeItems) {
    // Ignore Recipe items that are not soft deleted:
    if (recipeItem.softDeleted === false) {
      continue;
    }
    // Prepare the Recipe item:
    recipeItem.softDeleted = false;
    // Update the Recipe item in the DB:
    await tx.objectStore(RECIPES_STORE_NAME).put(recipeItem);
    recipesCount++;
  }
  await tx.done;
  // Return the undo soft deletion count:
  return {
    coffeeBeansCount: 1,
    recipesCount: recipesCount
  };
}