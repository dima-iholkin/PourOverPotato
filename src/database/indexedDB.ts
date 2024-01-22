import { openDB } from "idb";
import type { MyDB } from "./types/MyDB";
import { UniquenessCollisionFailure } from "./types/UniquenessCollisionFailure";
import { checkUniqueness } from "./helpers/checkUniqueness";

export const dbName = "example-database";
export const dbVersion = 1;

const coffeeBeansName = "coffeeBeans";
const recipesName = "recipes";

export async function createDemoDB() {
  const dbPromise = await openDB<MyDB>(dbName, dbVersion, {
    upgrade(db) {
      if (db.objectStoreNames.contains(coffeeBeansName) === false) {
        const coffeeBeansStore = db.createObjectStore(coffeeBeansName, { keyPath: "id", autoIncrement: true });
        coffeeBeansStore.createIndex("name", "name", { unique: true });
      }

      if (db.objectStoreNames.contains(recipesName) === false) {
        const recipesStore = db.createObjectStore(recipesName, { keyPath: "id", autoIncrement: true });
        recipesStore.createIndex("coffeeBeansId", "coffeeBeansId", { unique: false });
        recipesStore.createIndex("outputWeight", "outputWeight", { unique: false });
        recipesStore.createIndex("rating", "rating", { unique: false });
        recipesStore.createIndex("timestamp", "timestamp", { unique: false });
      }
    }
  });
}

export async function addCoffeeBeans(coffeeBeansItem: CoffeeBeans): Promise<CoffeeBeans | UniquenessCollisionFailure> {
  const db = await openDB<MyDB>(dbName, dbVersion);

  // Check that the CoffeeBeans record with the same name doesn't exist.

  const checkUniquenessResult = await checkUniqueness(coffeeBeansName, "name", coffeeBeansItem.name);

  if (checkUniquenessResult instanceof UniquenessCollisionFailure) {
    return checkUniquenessResult;
  }

  // Remove the Id property, so that the DB can assign it. Add the proper type support.

  const coffeeBeansObj: Partial<CoffeeBeans> = Object.assign({}, coffeeBeansItem);
  delete coffeeBeansObj.id;
  const coffeeBeansFinal = coffeeBeansObj as Omit<CoffeeBeans, "id">;

  try {
    const id = await db.add(coffeeBeansName, coffeeBeansFinal as CoffeeBeans);
    const coffeeBeansFinal2 = coffeeBeansFinal as CoffeeBeans;
    coffeeBeansFinal2.id = id;
    return coffeeBeansFinal2;
  } catch (error) {
    if (error instanceof DOMException && error.name === "ConstraintError") {
      console.error(
        `It seems a ConstraintError occurred while saving CoffeeBeans: ${coffeeBeansFinal.name} to the database.`
      );
    }

    throw error;
  }

  return new UniquenessCollisionFailure("name");
}

export function getCoffeeBeans(): CoffeeBeans[] {

}

export function getRecipes(): Recipe[] {

}