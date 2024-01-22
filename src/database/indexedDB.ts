import { openDB } from "idb";
import type { EntitiesDB } from "./types/EntitiesDB";
import type { CoffeeBeans, CoffeeBeansSubmit } from "../entities/CoffeeBeans";
import { UniquenessCollisionFailure } from "./types/UniquenessCollisionFailure";
import { checkUniqueness } from "./helpers/checkUniqueness";
import type { Recipe, RecipeSubmit } from "../entities/Recipe";

export const dbName = "entities";
export const dbVersion = 1;

const coffeeBeansStoreName = "coffeeBeans";
const recipesStoreName = "recipes";

export async function createDB() {
  await openDB<EntitiesDB>(dbName, dbVersion, {
    upgrade(db) {
      if (db.objectStoreNames.contains(coffeeBeansStoreName) === false) {
        const coffeeBeansStore = db.createObjectStore(coffeeBeansStoreName, { keyPath: "id", autoIncrement: true });

        coffeeBeansStore.createIndex("name", "name", { unique: true });
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

export async function addCoffeeBeans(item: CoffeeBeansSubmit): Promise<CoffeeBeans | UniquenessCollisionFailure> {
  const db = await openDB<EntitiesDB>(dbName, dbVersion);

  // Check that a CoffeeBeans record with the same name property doesn't exist:
  {
    const checkUniquenessResult: true | UniquenessCollisionFailure = await checkUniqueness(
      coffeeBeansStoreName, "name", item.name
    );

    if (checkUniquenessResult instanceof UniquenessCollisionFailure) {
      return checkUniquenessResult as UniquenessCollisionFailure;
    }
  }

  try {
    // Get the Id inserted into the DB:
    const id = await db.add(coffeeBeansStoreName, item as CoffeeBeans);

    // Assign the Id to the CoffeeBeans object:
    const itemSaved = item as CoffeeBeans;
    itemSaved.id = id;

    return itemSaved;
  } catch (error) {
    if (error instanceof DOMException && error.name === "ConstraintError") {
      console.error(
        `It seems a ConstraintError occurred while saving CoffeeBeans: ${item.name} to the database.`
      );
    }

    throw error;
  }
}

export async function addRecipe(item: RecipeSubmit): Promise<Recipe> {
  const db = await openDB<EntitiesDB>(dbName, dbVersion);

  // Get the Id inserted into the DB:
  const id = await db.add(recipesStoreName, item as Recipe);

  // Assign the Id to the Recipe object:
  const itemSaved = item as Recipe;
  itemSaved.id = id;

  return itemSaved;
}

export async function anyCoffeeBeansSaved() {
  const db = await openDB<EntitiesDB>(dbName, dbVersion);

  const count: number = await db.count(coffeeBeansStoreName);

  return count > 0;
}

export async function anyRecipesSaved() {
  const db = await openDB<EntitiesDB>(dbName, dbVersion);

  const count: number = await db.count(recipesStoreName);

  return count > 0;
}

// export function getCoffeeBeans(): CoffeeBeans[] {

// }

// export function getRecipes(): Recipe[] {

// }