import type { IDBPDatabase } from "idb";
import { COFFEEBEANS_STORE, ENHANCEDCOFFEEBEANS_STORE, openEntitiesDB, RECIPES_STORE } from "$lib/database/core/core";
import { regenerateEnhancedCoffeeBeansTable } from "$lib/database/manageEnhancedCoffeeBeans";
import type { ICoffeeBeansDB_v3 } from "$lib/prevVersions/v3/database/CoffeeBeansDBv3";
import type { EntitiesDB_v3 } from "$lib/prevVersions/v3/database/EntitiesDBv3";

export async function fillDbV3WithDuplicateCoffeeBeans() {
  // Open a transaction:
  const db: IDBPDatabase<EntitiesDB_v3> = await openEntitiesDB();
  // Guard clause, check it's v3 of the database:
  if (db.version != 3) {
    console.log("Cannot fill the DB with duplicate CoffeeBeans, because it's not v3 of the DB.");
    return;
  }
  const tx = db.transaction([COFFEEBEANS_STORE, ENHANCEDCOFFEEBEANS_STORE, RECIPES_STORE], "readwrite");
  // Guard clause, make sure there are no present CoffeeBeans before the fill:
  const itemsCount: number = await tx.objectStore(COFFEEBEANS_STORE).count();
  if (itemsCount > 0) {
    await tx.objectStore(COFFEEBEANS_STORE).clear();
    await tx.objectStore(ENHANCEDCOFFEEBEANS_STORE).clear();
  }
  // Save the first item:
  const nameItem1: string = "Coffee";
  const item1: Partial<ICoffeeBeansDB_v3> = {
    name: nameItem1,
    nameLowerCase: nameItem1.toLowerCase(),
    softDeletionTimestamp: undefined,
    description: ""
  };
  await tx.objectStore(COFFEEBEANS_STORE).add(item1 as ICoffeeBeansDB_v3);
  // Save the duplicate item:
  await tx.objectStore(COFFEEBEANS_STORE).add(item1 as ICoffeeBeansDB_v3);
  // Save the item with a copy number 0 already:
  const nameItem2: string = "Coffee-0";
  const item2: Partial<ICoffeeBeansDB_v3> = {
    name: nameItem2,
    nameLowerCase: nameItem2.toLowerCase(),
    softDeletionTimestamp: undefined,
    description: ""
  };
  await tx.objectStore(COFFEEBEANS_STORE).add(item2 as ICoffeeBeansDB_v3);
  // Save the item with a copy number 1 already:
  const nameItem3: string = "Coffee-1";
  const item3: Partial<ICoffeeBeansDB_v3> = {
    name: nameItem3,
    nameLowerCase: nameItem3.toLowerCase(),
    softDeletionTimestamp: undefined,
    description: ""
  };
  await tx.objectStore(COFFEEBEANS_STORE).add(item3 as ICoffeeBeansDB_v3);
  // Regenerate the EnhancedCoffeeBeans table:
  await regenerateEnhancedCoffeeBeansTable(tx);
  // We're done:
  await tx.done;
}