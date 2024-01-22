import { openDB } from "idb";
import type { EntitiesDB } from "../types/EntitiesDB";
import { UniquenessCollisionFailure } from "../types/UniquenessCollisionFailure";
import { dbName, dbVersion } from "../indexedDB";

export async function checkUniqueness(
  storeName: "coffeeBeans" | "recipes", indexName: string, indexKey: string | number
): Promise<true | UniquenessCollisionFailure> {
  const db = await openDB<EntitiesDB>(dbName, dbVersion);

  // @ts-ignore
  const itemFromDB = await db.getFromIndex(storeName, indexName, indexKey);

  if (itemFromDB !== undefined) {
    return new UniquenessCollisionFailure(indexName);
  }

  return true;
}