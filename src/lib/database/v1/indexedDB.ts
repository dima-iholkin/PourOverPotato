import { openDB } from "idb";
import { CoffeeBeans, type CoffeeBeansCreateSubmit, CoffeeBeansEditSubmit } from "$lib/domain/entities/CoffeeBeans";
import { Recipe, type RecipeSubmit } from "$lib/domain/entities/Recipe";
import { CoffeeBeansDB, CoffeeBeansDBSubmit, type ICoffeeBeansDB } from "./types/CoffeeBeansDB";
import type { EntitiesDB } from "./types/EntitiesDB";
import { type IRecipeDB, RecipeDB, RecipeDBSubmit } from "./types/RecipeDB";

// Static data:

const dbName = "entities";
const dbVersion = 1;

const coffeeBeansStoreName = "coffeeBeans";
const coffeeBeansIndexName = "nameLowerCase";

const recipesStoreName = "recipes";

// The most important function:

export async function openEntitiesDB() {
  return await openDB<EntitiesDB>(dbName, dbVersion, {
    upgrade(db) {
      if (db.objectStoreNames.contains(coffeeBeansStoreName) === false) {
        const coffeeBeansStore = db.createObjectStore(coffeeBeansStoreName, { keyPath: "id", autoIncrement: true });

        coffeeBeansStore.createIndex(coffeeBeansIndexName, coffeeBeansIndexName, { unique: true });
      }

      if (db.objectStoreNames.contains(recipesStoreName) === false) {
        const recipesStore = db.createObjectStore(recipesStoreName, { keyPath: "id", autoIncrement: true });

        recipesStore.createIndex("coffeeBeansId", "coffeeBeansId", { unique: false });
        recipesStore.createIndex("outWeight", "outWeight", { unique: false });
        recipesStore.createIndex("rating", "rating", { unique: false });
        recipesStore.createIndex("timestamp", "timestamp", { unique: false });
      }
    }
  });
}

// Public functions:

export async function addCoffeeBeans(item: CoffeeBeansCreateSubmit): Promise<CoffeeBeans | "Failure_NameAlreadyExist"> {
  // Check that a CoffeeBeans record with the same property "name" doesn't exist:

  const itemFromDB: CoffeeBeans | undefined = await getCoffeeBeansByName(item.name);

  if (itemFromDB !== undefined) {
    return "Failure_NameAlreadyExist";
  }

  // Normal flow:

  const itemDBSubmit: CoffeeBeansDBSubmit = new CoffeeBeansDBSubmit(item);

  try {
    // Save and get the Id inserted into the DB:
    const db = await openEntitiesDB();
    const id = await db.add(coffeeBeansStoreName, itemDBSubmit as ICoffeeBeansDB);

    // Assign the saved Id to the CoffeeBeans object:
    const itemDBsaved = new CoffeeBeansDB(itemDBSubmit, id);

    return itemDBsaved.toCoffeeBeans();
  } catch (error) {
    if (error instanceof DOMException && error.name === "ConstraintError") {
      console.error(`A ConstraintError occurred while saving coffee beans "${item.name}" to the database.`);

      return "Failure_NameAlreadyExist";
    } else {
      throw error;
    }
  }
}

export async function addRecipe(item: RecipeSubmit): Promise<Recipe> {
  const db = await openEntitiesDB();

  const itemDB: RecipeDBSubmit = new RecipeDBSubmit(item);

  // Get the Id inserted into the DB:
  const id = await db.add(recipesStoreName, itemDB as IRecipeDB);

  // Assign the saved Id to the saved Recipe:
  const itemDBsaved = new RecipeDB(itemDB, id);

  return itemDBsaved.toRecipe();
}

export async function anyCoffeeBeansSaved() {
  const db = await openEntitiesDB();

  const count: number = await db.count(coffeeBeansStoreName);

  return count > 0;
}

export async function anyRecipesSaved() {
  const db = await openEntitiesDB();

  const count: number = await db.count(recipesStoreName);

  return count > 0;
}

export async function
  editCoffeeBeans(submitItem: CoffeeBeansEditSubmit): Promise<CoffeeBeans | "Failure_NameAlreadyExist"> {
  const db = await openEntitiesDB();

  const dbItem: ICoffeeBeansDB | undefined = await db.getFromIndex(
    coffeeBeansStoreName, coffeeBeansIndexName, submitItem.name.toLowerCase()
  );

  if (dbItem !== undefined && dbItem.id !== submitItem.id) {
    return "Failure_NameAlreadyExist";
  }

  const dbSubmitItem: ICoffeeBeansDB = {
    id: submitItem.id,
    name: submitItem.name,
    description: submitItem.description,
    nameLowerCase: submitItem.name.toLowerCase()
  };
  await db.put(coffeeBeansStoreName, dbSubmitItem);

  const coffeeBeans: Omit<CoffeeBeans, "id"> = {
    name: dbSubmitItem.name,
    description: dbSubmitItem.description
  };
  return new CoffeeBeans(coffeeBeans, dbSubmitItem.id);
}

export async function getAllCoffeeBeans(): Promise<CoffeeBeans[]> {
  const db = await openEntitiesDB();

  const itemsShape: ICoffeeBeansDB[] = await db.getAll(coffeeBeansStoreName);

  const items: CoffeeBeans[] = itemsShape.map(item => new CoffeeBeansDB(item, item.id).toCoffeeBeans());
  return items;
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const db = await openEntitiesDB();

  const itemsShape: IRecipeDB[] = await db.getAll(recipesStoreName);

  const items: Recipe[] = itemsShape.map(item => new RecipeDB(item, item.id).toRecipe());
  return items;
}

export async function getCoffeeBeansById(id: number): Promise<CoffeeBeans | undefined> {
  const db = await openEntitiesDB();

  const itemShape: ICoffeeBeansDB | undefined = await db.get(coffeeBeansStoreName, id);

  if (itemShape === undefined) {
    return itemShape;
  }

  return new CoffeeBeansDB(itemShape, itemShape.id).toCoffeeBeans();
}

export async function getCoffeeBeansByName(name: string): Promise<CoffeeBeans | undefined> {
  const db = await openEntitiesDB();

  const itemShape: ICoffeeBeansDB | undefined = await db.getFromIndex(
    coffeeBeansStoreName, coffeeBeansIndexName, name.toLowerCase()
  );

  if (itemShape === undefined) {
    return undefined;
  }

  return new CoffeeBeansDB(itemShape, itemShape.id).toCoffeeBeans();
}

export async function getRecipeById(id: number): Promise<Recipe | undefined> {
  const db = await openEntitiesDB();

  const itemShape: IRecipeDB | undefined = await db.get(recipesStoreName, id);

  if (itemShape === undefined) {
    return undefined;
  }

  return new RecipeDB(itemShape, itemShape.id).toRecipe();
}

export async function getRecipesByCoffeeBeansId(id: number): Promise<Recipe[]> {
  const db = await openEntitiesDB();

  const itemsShape: IRecipeDB[] = await db.getAllFromIndex(recipesStoreName, "coffeeBeansId", id);

  const items: Recipe[] = itemsShape.map(item => new RecipeDB(item, item.id).toRecipe());
  return items;
}

export async function getRecipesCountByCoffeeBeansId(coffeeBeansid: number): Promise<number> {
  const db = await openEntitiesDB();

  const items = await db.getAllFromIndex(recipesStoreName, "coffeeBeansId", coffeeBeansid);

  return items.length;
}