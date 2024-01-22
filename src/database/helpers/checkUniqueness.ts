import { openDB } from "idb";
import type { MyDB } from "../types/MyDB";
import { UniquenessCollisionFailure } from "../types/UniquenessCollisionFailure";
import { dbName, dbVersion } from "../indexedDB";

export async function checkUniqueness(
  storeName: "coffeeBeans" | "recipes", indexName: string, indexKey: string | number
): Promise<true | UniquenessCollisionFailure> {
  const db = await openDB<MyDB>(dbName, dbVersion);

  // @ts-ignore
  const itemFromDB = await db.getFromIndex(storeName, indexName, indexKey);

  if (itemFromDB !== undefined) {
    return new UniquenessCollisionFailure(indexName);
  }

  return true;
}