import { openDB } from "idb";

export async function useDB() {
  console.log("Creating object stores...");

  const dbPromise = await openDB("example-database", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("coffeeBeans") === false) {
        const coffeeBeansStore = db.createObjectStore("coffeeBeans", { keyPath: "id", autoIncrement: true });
        coffeeBeansStore.createIndex("name", "name", { unique: true });
      }

      if (db.objectStoreNames.contains("recipes") === false) {
        const recipesStore = db.createObjectStore("recipes", { keyPath: "id", autoIncrement: true });
        recipesStore.createIndex("coffeeBeansId", "coffeeBeansId", { unique: false });
        recipesStore.createIndex("outputWeight", "outputWeight", { unique: false });
        recipesStore.createIndex("rating", "rating", { unique: false });
        recipesStore.createIndex("timestamp", "timestamp", { unique: false });
      }
    }
  });
}