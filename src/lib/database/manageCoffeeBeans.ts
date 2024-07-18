import {
  CoffeeBeans, type CoffeeBeansCreateSubmit, type CoffeeBeansEditSubmit
} from "$lib/domain/entities/CoffeeBeans";
import type { Count } from "$lib/helperTypes/Count";
import {
  COFFEEBEANS_NAMELOWERCASE_INDEX, COFFEEBEANS_STORE, ENHANCEDCOFFEEBEANS_STORE, RECIPES_COFFEEBEANSID_INDEX,
  RECIPES_STORE, openEntitiesDB
} from "./core/core";
import { CoffeeBeansDB, CoffeeBeansDBSubmit, type ICoffeeBeansDB } from "./types/CoffeeBeansDB";
import type { IEnhancedCoffeeBeansDB } from "./types/EnhancedCoffeeBeansDB";
import type { IRecipeDB } from "./types/RecipeDB";

// Public functions:

export async function addCoffeeBeans(item: CoffeeBeansCreateSubmit): Promise<CoffeeBeans | "Failure_NameAlreadyExist"> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE, ENHANCEDCOFFEEBEANS_STORE], "readwrite");
  // Guard clause, check that a CoffeeBeans item with the same Name doesn't exist:
  const itemDb: ICoffeeBeansDB | undefined = await tx.objectStore(COFFEEBEANS_STORE).index("nameLowerCase")
    .get(item.name.toLowerCase());
  if (itemDb) {
    return "Failure_NameAlreadyExist";
  }
  // Prepare and save the new CoffeeBeans item:
  const itemDBSubmit: CoffeeBeansDBSubmit = new CoffeeBeansDBSubmit(item);
  const id = await tx.objectStore(COFFEEBEANS_STORE).add(itemDBSubmit as ICoffeeBeansDB);
  // Prepare and save the new EnhancedCoffeeBeans item:
  const enhancedCoffeeBeans: IEnhancedCoffeeBeansDB = {
    id: id,
    recipesCount: 0,
    earliestRecipeTimestamp: undefined,
    latestRecipeTimestamp: undefined
  };
  await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE).add(enhancedCoffeeBeans);
  await tx.done;
  // Prepare and return the saved CoffeeBeans item:
  const itemDBsaved = new CoffeeBeansDB({ ...itemDBSubmit, id });
  return itemDBsaved.toCoffeeBeans();
}

export async function anyCoffeeBeans(): Promise<boolean> {
  const db = await openEntitiesDB();
  const count: number = await db.count(COFFEEBEANS_STORE);
  return count > 0;
}

export async function checkCoffeeBeansDuplicate(coffeeBeansName: string):
  Promise<"CoffeeBeansNotFound" | "Failure_NameAlreadyExist"> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction(COFFEEBEANS_STORE, "readwrite");
  // Load the present version of the CoffeeBeans item:
  const presentItem: ICoffeeBeansDB | undefined = await tx.objectStore(COFFEEBEANS_STORE)
    .index(COFFEEBEANS_NAMELOWERCASE_INDEX)
    .get(coffeeBeansName.trim().toLowerCase());
  if (presentItem === undefined) {
    return "CoffeeBeansNotFound";
  } else {
    return "Failure_NameAlreadyExist";
  }
}

export async function editCoffeeBeans(item: CoffeeBeansEditSubmit):
  Promise<CoffeeBeans | "Failure_NameAlreadyExist" | "CoffeeBeansNotFound"> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction(COFFEEBEANS_STORE, "readwrite");
  // Load the present version of the CoffeeBeans item:
  const presentItem: ICoffeeBeansDB | undefined = await tx.objectStore(COFFEEBEANS_STORE).get(item.id);
  // Guard clause, check if the edited CoffeeBeans is actually present in the DB:
  if (presentItem === undefined) {
    console.error(
      `The edited CoffeeBeans item ${JSON.stringify(item)} wasn't found in the database. Edit operation aborted.`
    );
    return "CoffeeBeansNotFound";
  }
  // Guard clause, check if the Name was changed:
  if (item.name.toLowerCase() !== presentItem.nameLowerCase) {
    // Make sure it's not going to be a name collision:
    const anotherItemWithThisName: ICoffeeBeansDB | undefined = await tx.objectStore(COFFEEBEANS_STORE)
      .index(COFFEEBEANS_NAMELOWERCASE_INDEX).get(item.name.toLowerCase());
    if (anotherItemWithThisName) {
      await tx.done;
      return "Failure_NameAlreadyExist";
    }
  }
  // Prepare and save the changed CoffeeBeans item:
  const submitItem: ICoffeeBeansDB = new CoffeeBeansDB({
    ...item,
    nameLowerCase: item.name.toLowerCase(),
    softDeletionTimestamp: undefined
  });
  await tx.objectStore(COFFEEBEANS_STORE).put(submitItem);
  await tx.done;
  // Prepare and return the saved CoffeeBeans item:
  return new CoffeeBeans(submitItem);
}

export async function getAllCoffeeBeans(): Promise<CoffeeBeans[]> {
  // Load the CoffeeBeans item:
  const db = await openEntitiesDB();
  const itemsDB: ICoffeeBeansDB[] = await db.getAll(COFFEEBEANS_STORE);
  // Prepare and return the CoffeeBeans items:
  const items: CoffeeBeans[] = itemsDB.filter(item => item.softDeletionTimestamp === undefined)
    .map(item => new CoffeeBeansDB(item).toCoffeeBeans());
  return items;
}

export async function getCoffeeBeansById(id: number): Promise<CoffeeBeans | undefined> {
  // Load the CoffeeBeans items:
  const db = await openEntitiesDB();
  const item: ICoffeeBeansDB | undefined = await db.get(COFFEEBEANS_STORE, id);
  // Guard clause, check if not found or soft-deleted:
  if (item === undefined || item.softDeletionTimestamp) {
    return undefined;
  }
  // Prepare and return the CoffeeBeans item:
  return new CoffeeBeansDB(item).toCoffeeBeans();
}

export async function getCoffeeBeansByName(name: string): Promise<CoffeeBeans | undefined> {
  // Load the CoffeeBeans item:
  const db = await openEntitiesDB();
  const item: ICoffeeBeansDB | undefined = await db.getFromIndex(
    COFFEEBEANS_STORE, COFFEEBEANS_NAMELOWERCASE_INDEX, name.toLowerCase()
  );
  // Guard clause, check if not found or soft-deleted:
  if (item === undefined || item.softDeletionTimestamp) {
    return undefined;
  }
  // Prepare and return the CoffeeBeans item:
  return new CoffeeBeansDB(item).toCoffeeBeans();
}

export async function hardDeleteCoffeeBeansAndRecipesById(coffeeBeansId: number): Promise<Count> {
  let recipesCount = 0;
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE, RECIPES_STORE, ENHANCEDCOFFEEBEANS_STORE], "readwrite");
  // Load all Recipes by CoffeeBeansId:
  const recipeItems: IRecipeDB[] = await tx.objectStore(RECIPES_STORE).index(RECIPES_COFFEEBEANSID_INDEX)
    .getAll(coffeeBeansId);
  // Hard-delete the Recipes:
  for (const item of recipeItems) {
    await tx.objectStore(RECIPES_STORE).delete(item.id);
    recipesCount++;
  }
  // Hard-delete the CoffeeBeans item:
  tx.objectStore(COFFEEBEANS_STORE).delete(coffeeBeansId);
  // Hard-delete the EnhancedCoffeeBeans item:
  tx.objectStore(ENHANCEDCOFFEEBEANS_STORE).delete(coffeeBeansId);
  await tx.done;
  // Prepare and return the hard-deletion count:
  return {
    coffeeBeansCount: 1,
    recipesCount
  };
}

export async function softDeleteCoffeeBeansAndRecipesById(coffeeBeansId: number):
  Promise<Count | "CoffeeBeansNotFound"> {
  let recipesCount = 0;
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE, RECIPES_STORE], "readwrite");
  // Load the CoffeeBeans item:
  const coffeeBeansItem: ICoffeeBeansDB | undefined = await tx.objectStore(COFFEEBEANS_STORE).get(coffeeBeansId);
  // Guard clause, check if the CoffeeBeans item not found:
  if (coffeeBeansItem === undefined) {
    await tx.done;
    return "CoffeeBeansNotFound";
  }
  // Load all Recipes by CoffeeBeansId:
  const recipeItems: IRecipeDB[] = await tx.objectStore(RECIPES_STORE).index(RECIPES_COFFEEBEANSID_INDEX)
    .getAll(coffeeBeansId);
  // Have a single softDeletionTimestamp:
  const _softDeletionTimestamp: number = Date.now();
  // Soft-delete the Recipes:
  for (const recipe of recipeItems) {
    // Ignore the already soft-deleted Recipes:
    if (recipe.softDeletionTimestamp) {
      continue;
    }
    // Soft-delete the Recipes:
    recipe.softDeletionTimestamp = _softDeletionTimestamp;
    await tx.objectStore(RECIPES_STORE).put(recipe);
    recipesCount++;
  }
  // Soft-delete the CoffeeBeans item:
  coffeeBeansItem.softDeletionTimestamp = _softDeletionTimestamp;
  tx.objectStore(COFFEEBEANS_STORE).put(coffeeBeansItem);
  await tx.done;
  // Prepare and return the soft-deletion count:
  return {
    coffeeBeansCount: 1,
    recipesCount
  };
}

export async function undoSoftDeleteCoffeeBeansAndRecipesById(coffeeBeansId: number):
  Promise<Count | "CoffeeBeansNotFound"> {
  let recipesCount = 0;
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = db.transaction([COFFEEBEANS_STORE, RECIPES_STORE], "readwrite");
  // Load the CoffeeBeans item:
  const coffeeBeansItem: ICoffeeBeansDB | undefined = await tx.objectStore(COFFEEBEANS_STORE).get(coffeeBeansId);
  // Guard clause, check if the CoffeeBeans item not found:
  if (coffeeBeansItem === undefined) {
    await tx.done;
    return "CoffeeBeansNotFound";
  }
  // Guard clause, check if the CoffeeBeans item wasn't soft-deleted:
  if (coffeeBeansItem.softDeletionTimestamp === undefined) {
    await tx.done;
    return { coffeeBeansCount: 0, recipesCount: 0 };
  }
  // Get the CoffeeBeans item's softDeletionTimestamp:
  const _softDeletionTimestamp: number = coffeeBeansItem.softDeletionTimestamp;
  // Undo soft-delete the CoffeeBeans item:
  coffeeBeansItem.softDeletionTimestamp = undefined;
  tx.objectStore(COFFEEBEANS_STORE).put(coffeeBeansItem);
  // Load all Recipes by CoffeeBeansId:
  const recipeItems: IRecipeDB[] = await tx.objectStore(RECIPES_STORE).index(RECIPES_COFFEEBEANSID_INDEX)
    .getAll(coffeeBeansId);
  // Undo soft-delete the Recipes:
  for (const recipeItem of recipeItems) {
    // Ignore the not soft-deleted Recipes:
    if (recipeItem.softDeletionTimestamp === undefined) {
      continue;
    }
    // Ignore the Recipes that were soft-deleted earlier:
    if (recipeItem.softDeletionTimestamp < _softDeletionTimestamp) {
      continue;
    }
    // Undo soft-delete the Recipes:
    recipeItem.softDeletionTimestamp = undefined;
    await tx.objectStore(RECIPES_STORE).put(recipeItem);
    recipesCount++;
  }
  await tx.done;
  // Prepare and return the undone soft-deletion count:
  return {
    coffeeBeansCount: 1,
    recipesCount
  };
}