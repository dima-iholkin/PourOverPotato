import { openDB } from "idb";
import type { EntitiesDB } from "./types/EntitiesDB";
import { CoffeeBeansDBSubmit, CoffeeBeans, type CoffeeBeansSubmit, type CoffeeBeansDB } from "../entities/CoffeeBeans";
import { UniquenessCollisionFailure } from "./types/UniquenessCollisionFailure";
import type { Recipe, RecipeSubmit } from "../entities/Recipe";

// Static:

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
        recipesStore.createIndex("outputWeight", "outputWeight", { unique: false });
        recipesStore.createIndex("rating", "rating", { unique: false });
        recipesStore.createIndex("timestamp", "timestamp", { unique: false });
      }
    }
  });
}

// Public functions:

export async function addCoffeeBeans(itemSubmit: CoffeeBeansSubmit): Promise<CoffeeBeans | UniquenessCollisionFailure> {
  // Check that a CoffeeBeans record with the same property "name" doesn't exist:

  const item: CoffeeBeans | undefined = await getCoffeeBeansByName(itemSubmit.name);

  if (item === undefined) {
    return new UniquenessCollisionFailure("name");
  }

  // Normal flow:

  const itemDBSubmit: CoffeeBeansDBSubmit = new CoffeeBeansDBSubmit(itemSubmit);

  try {
    // Save and get the Id inserted into the DB:
    const db = await openEntitiesDB();
    const id = await db.add(coffeeBeansStoreName, itemDBSubmit as CoffeeBeansDB);

    // Assign the Id to the CoffeeBeans object:
    const savedItem: CoffeeBeans = new CoffeeBeans(itemSubmit, id);
    return savedItem;
  } catch (error) {
    if (error instanceof DOMException && error.name === "ConstraintError") {
      console.error(
        `It seems a ConstraintError occurred while saving CoffeeBeans: ${itemSubmit.name} to the database.`
      );
    }

    throw error;
  }
}

export async function addRecipe(item: RecipeSubmit): Promise<Recipe> {
  const db = await openEntitiesDB();

  // Get the Id inserted into the DB:
  const id = await db.add(recipesStoreName, item as Recipe);

  // Assign the Id to the Recipe object:
  const itemSaved = item as Recipe;
  itemSaved.id = id;

  return itemSaved;
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

export async function getAllCoffeeBeans(): Promise<CoffeeBeans[]> {
  const db = await openEntitiesDB();

  const items = await db.getAll(coffeeBeansStoreName);

  return items;
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const db = await openEntitiesDB();

  const items = await db.getAll(recipesStoreName);

  return items;
}

export async function getCoffeeBeansById(id: number): Promise<CoffeeBeans | undefined> {
  const db = await openEntitiesDB();

  const item = await db.get(coffeeBeansStoreName, id);

  return item;
}

export async function getCoffeeBeansByName(name: string): Promise<CoffeeBeans | undefined> {
  const db = await openEntitiesDB();

  const item = await db.getFromIndex(coffeeBeansStoreName, coffeeBeansIndexName, name.toLowerCase());

  return item;
}

export async function getRecipesByCoffeeBeansId(id: number): Promise<Recipe[] | undefined> {
  const db = await openEntitiesDB();

  const items = await db.getAllFromIndex(recipesStoreName, "coffeeBeansId", id);

  return items;
}

// Private functions:
