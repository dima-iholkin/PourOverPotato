import { openDB, type DBSchema } from "idb";

interface MyDB extends DBSchema {
  coffeeBeans: {
    key: number,
    value: Omit<CoffeeBeans, "id">,
    indexes: { name: string }
  },
  recipes: {
    key: number,
    value: Recipe,
    indexes: {
      coffeeBeansId: number,
      outputWeight: number,
      rating: number,
      timestamp: Date
    }
  }
}

const dbName = "example-database";
const dbVersion = 1;

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

// export async function addDemoCoffeeBeans(): Promise<SaveSuccess | SaveFailed> {
//   const db = await openDB<MyDB>(dbName, dbVersion);

//   const coffeeBeansItem: Omit<CoffeeBeans, "id"> = {
//     name: "Rwanda Mabanza",
//     details: "Filter roast. Washed process. Dark plum, burned cherry notes.",
//   }

//   try {
//     await db.add(coffeeBeansName, coffeeBeansItem);
//     return new SaveSuccess();
//   } catch (error) {
//     if (error instanceof DOMException) {
//       if (error.name === "ConstraintError") {
//         console.log("It seems a coffee beans with the same name already exist in the database.");
//       }

//       return new SaveFailed();
//     }
//   }

//   return new SaveFailed();
// }

export async function addCoffeeBeans(coffeeBeansItem: CoffeeBeans): Promise<SaveSuccess | SaveFailed> {
  const db = await openDB<MyDB>(dbName, dbVersion);

  // Remove the Id property, so that the DB can assign it. Add the proper type support.
  const coffeeBeansObj: Partial<CoffeeBeans> = Object.assign({}, coffeeBeansItem);
  delete coffeeBeansObj.id;
  const coffeeBeansFinal = coffeeBeansObj as Omit<CoffeeBeans, "id">;

  try {
    await db.add(coffeeBeansName, coffeeBeansFinal);
    return new SaveSuccess();
  } catch (error) {
    if (error instanceof DOMException) {
      if (error.name === "ConstraintError") {
        console.log("It seems a coffee beans with the same name already exist in the database.");
      }

      return new SaveFailed();
    }
  }

  return new SaveFailed();
}

class SaveFailed { }

class SaveSuccess { }