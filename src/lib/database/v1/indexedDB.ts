import { openDB } from "idb";
import { CoffeeBeans, type CoffeeBeansCreateSubmit, CoffeeBeansEditSubmit } from "$lib/domain/entities/CoffeeBeans";
import { Recipe, type RecipeSubmit } from "$lib/domain/entities/Recipe";
import { parseDateFromInputString } from "$lib/helpers/dateHelpers";
import { CoffeeBeansDB, CoffeeBeansDBSubmit, type ICoffeeBeansDB } from "./types/CoffeeBeansDB";
import type { EntitiesDB } from "./types/EntitiesDB";
import type { ExportJSON } from "./types/ExportJSON";
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

export async function deleteAllData() {
  const db = await openEntitiesDB();

  const all: IDBKeyRange = IDBKeyRange.bound(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

  await db.delete(coffeeBeansStoreName, all);
  await db.delete(recipesStoreName, all);
}

export async function deleteCoffeeBeansById(id: number) {
  const db = await openEntitiesDB();

  await db.delete(coffeeBeansStoreName, id);
}

export async function deleteRecipeById(id: number) {
  const db = await openEntitiesDB();

  await db.delete(recipesStoreName, id);
}

export async function deleteRecipesByCoffeeBeansId(coffeeBeansId: number): Promise<number> {
  const db = await openEntitiesDB();

  const items: IRecipeDB[] = await db.getAllFromIndex(recipesStoreName, "coffeeBeansId", coffeeBeansId);

  await Promise.all(
    items.map(async (item: IRecipeDB) => await db.delete(recipesStoreName, item.id))
  );

  return items.length;
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

export async function editRecipe(submitItem: Recipe): Promise<Recipe> {
  const db = await openEntitiesDB();

  const dbSubmitItem: RecipeDB = new RecipeDB(submitItem, submitItem.id);
  await db.put(recipesStoreName, dbSubmitItem);

  return dbSubmitItem.toRecipe();
}

export async function exportAllData() {
  const obj: ExportJSON = {
    dbVersion: dbVersion,
    coffeeBeans: await getAllCoffeeBeans(),
    recipes: await getAllRecipes()
  };

  const json = JSON.stringify(obj);
  const blob = new Blob([json], { type: "application/json" });
  return blob;
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

export async function importData(jsonFile: File) {
  const obj: ExportJSON = JSON.parse(await jsonFile.text());

  // Guard clauses:

  if (obj.dbVersion === undefined) {
    alert("dbVersion property not found in the file.");
    return;
  }

  if (obj.dbVersion !== dbVersion) {
    alert(`Expected dbVersion value: ${dbVersion}.`);
    return;
  }

  if (obj.coffeeBeans === undefined || Array.isArray(obj.coffeeBeans) === false) {
    alert("coffeeBeans array not found.");
    return;
  }

  if (obj.recipes === undefined || Array.isArray(obj.recipes) === false) {
    alert("recipes array not found.");
    return;
  }

  // Merge CoffeeBeans:

  const mapNewCoffeeBeansIdToOldId = new Map<number, number>();

  const oldCoffeeBeans: CoffeeBeans[] = await getAllCoffeeBeans();

  for (let newItem of obj.coffeeBeans) {
    newItem = new CoffeeBeans(newItem, newItem.id);
    // If we've found a matching CoffeeBeans name,
    // remember the oldMatch's Id and use it in place of the newItem's Id for recipes import.
    const oldMatch: CoffeeBeans | undefined = oldCoffeeBeans.find(oldItem =>
      oldItem.name.toLowerCase() === newItem.name.toLowerCase()
    );
    if (oldMatch !== undefined && oldMatch.id === newItem.id) {
      mapNewCoffeeBeansIdToOldId.set(newItem.id, oldMatch.id);
      continue;
    }
    else if (oldMatch !== undefined) {
      mapNewCoffeeBeansIdToOldId.set(newItem.id, oldMatch.id);
      continue;
    }

    // If there is no match, save the new CoffeeBeans. But make sure to use the new Id for mapping recipes.
    const result: CoffeeBeans | "Failure_NameAlreadyExist" = await addCoffeeBeans(newItem);

    if (result === "Failure_NameAlreadyExist") {
      alert("Failure_NameAlreadyExist error during importing CoffeeBeans. This shouldn't be possible, sorry. " +
        "Contact the developer, I guess.");
      throw new Error("Failure_NameAlreadyExist");
    }

    mapNewCoffeeBeansIdToOldId.set(newItem.id, result.id);
  };

  // Merge Recipes:

  const oldRecipes: Recipe[] = await getAllRecipes();

  for (let newItem of obj.recipes) {
    newItem.timestamp = parseDateFromInputString(newItem.timestamp as unknown as string);
    newItem = new Recipe(newItem, newItem.id);
    if (mapNewCoffeeBeansIdToOldId.has(newItem.coffeeBeansId) === false) {
      alert(`Could not find a correct CoffeeBeansId for imported recipe with Id ${newItem.id}. Sorry, something went wrong.`);
      throw new Error("Could not find a correct CoffeeBeansId for imported recipe.");
    }

    newItem.coffeeBeansId = mapNewCoffeeBeansIdToOldId.get(newItem.coffeeBeansId)!;

    const oldMatch: Recipe | undefined = oldRecipes.find(oldItem =>
      oldItem.timestamp.getTime() === newItem.timestamp.getTime() &&
      oldItem.outWeight === newItem.outWeight &&
      oldItem.rating === newItem.rating &&
      oldItem.recipeTarget === newItem.recipeTarget &&
      oldItem.recipeResult === newItem.recipeResult &&
      oldItem.recipeThoughts === newItem.recipeThoughts
    );

    if (oldMatch === undefined) {
      await addRecipe(newItem);
    }
  }

  alert("CoffeeBeans and Recipes import finished.");
}