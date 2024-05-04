import type { IDBPDatabase } from "idb";
import { CoffeeBeans, CoffeeBeansCreateSubmit, type ICoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import { Recipe, RecipeSubmit, type IRecipe } from "$lib/domain/entities/Recipe";
import { parseDateFromInputString } from "$lib/helpers/dateHelpers";
import { getRandomIntInclusive } from "$lib/helpers/randomHelpers";
import { isNullOrUndefined } from "$lib/helpers/undefinedHelpers";
import { addCoffeeBeans, getAllCoffeeBeans, getCoffeeBeansByName } from "../entities/indexedDB_CoffeeBeans";
import { addRecipe, getAllRecipes } from "../entities/indexedDB_Recipes";
import { COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME, openEntitiesDB } from "../indexedDB_Core";
import type { Count } from "../types/Count";
import type { EntitiesDB } from "../types/EntitiesDB";
import type { ExportJSON } from "../types/ExportJSON";
import type { ImportedJsonCoffeeBeans, ImportedJsonRecipe, ImportJSON } from "../types/ImportJSON";
import { CoffeeBeansDB, CoffeeBeansDBSubmit, type ICoffeeBeansDB } from "../types/CoffeeBeansDB";
import { RecipeDB, RecipeDBSubmit, type IRecipeDB } from "../types/RecipeDB";

// Public functions:

export async function deleteAllData(): Promise<void> {
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = await db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readwrite");
  // Delete all entities:
  await tx.objectStore(RECIPES_STORE_NAME).clear();
  await tx.objectStore(COFFEEBEANS_STORE_NAME).clear();
  await tx.done;
}

export async function exportAllData(): Promise<Blob> {
  // Open a transaction:
  const db: IDBPDatabase<EntitiesDB> = await openEntitiesDB();
  const tx = await db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readonly");
  // Load the CoffeeBeans items and Recipes:
  const coffeeBeansDbItems: ICoffeeBeansDB[] = await tx.objectStore(COFFEEBEANS_STORE_NAME).getAll();
  const recipeDbItems: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME).getAll();
  await tx.done;
  // Prepare the CoffeeBeans items and Recipes:
  const coffeeBeansItems: CoffeeBeans[] = coffeeBeansDbItems
    .filter(itemDb => itemDb.softDeleted === undefined || itemDb.softDeleted === false)
    .map(itemDb => new CoffeeBeansDB(itemDb).toCoffeeBeans());
  const recipes: Recipe[] = recipeDbItems
    .filter(itemDb => itemDb.softDeleted === undefined || itemDb.softDeleted === false)
    .map(itemDb => new RecipeDB(itemDb).toRecipe());
  // Prepare the export data object:
  const exported: ExportJSON = {
    dbVersion: tx.db.version,
    coffeeBeans: coffeeBeansItems,
    recipes: recipes
  };
  // Serialize all data:
  const json = JSON.stringify(exported);
  return new Blob([json], { type: "application/json" });
}





/**
 * The import will be aborted, if anything is wrong in the `jsonFile`.
 */
export async function importDataFromJson(jsonFile: File): Promise<Count | "ImportFailed"> {
  // Deserialize all data:
  const imported: ImportJSON = JSON.parse(await jsonFile.text());
  // Open a transaction:
  const db = await openEntitiesDB();
  const tx = await db.transaction([COFFEEBEANS_STORE_NAME, RECIPES_STORE_NAME], "readwrite");
  // Parse the DbVersion field:
  const parsedDbVersion: number | "ImportFailed" = parseDbVersion(imported.dbVersion, tx.db.version);
  // Guard clause:
  if (parsedDbVersion === "ImportFailed") {
    await tx.abort();
    return "ImportFailed";
  }
  // Use a Map to keep track of the correct Id's for imported CoffeeBeans:
  const matchCoffeeBeansIds = new Map<number, number>();
  // Load the CoffeeBeans items from DB:
  const dbCoffeeBeans: CoffeeBeans[] = await tx.objectStore(COFFEEBEANS_STORE_NAME).getAll();
  // Parse the CoffeeBeans array:
  const parsedCoffeeBeansArray: CoffeeBeans[] | "ImportFailed" = parseCoffeeBeansArray(imported.coffeeBeans);
  if (parsedCoffeeBeansArray === "ImportFailed") {
    await tx.abort();
    return "ImportFailed";
  }
  const { coffeeBeansToAdd } = matchUniqueCoffeeBeansToAdd(
    parsedCoffeeBeansArray, dbCoffeeBeans, matchCoffeeBeansIds
  );
  // Save the unique CoffeeBeans items:
  let addedCoffeeBeansCount: number = 0;
  for (const parsedItem of coffeeBeansToAdd) {
    // Prepare the new CoffeeBeans item:
    const itemSubmit: CoffeeBeansDBSubmit = new CoffeeBeansDBSubmit(parsedItem);
    // Save the new CoffeeBeans item:
    const savedItemId: number = await tx.objectStore(COFFEEBEANS_STORE_NAME).add(itemSubmit as ICoffeeBeansDB);
    // Make sure to keep track of the created CoffeeBeans' Id to map the Recipe's CoffeeBeansId later.
    matchCoffeeBeansIds.set(parsedItem.id, savedItemId);
    // Count the added CoffeeBeans item:
    addedCoffeeBeansCount++;
  }
  // Parse the Recipes array:
  // Load the DB's Recipes:
  const dbRecipes: IRecipeDB[] = await tx.objectStore(RECIPES_STORE_NAME).getAll();
  // Merge the imported and the DB's Recipes:
  const parsedRecipesArray: { recipesToAdd: Recipe[] } | "ImportFailed" = parseRecipesArray(
    imported.recipes, dbRecipes, matchCoffeeBeansIds
  );
  // Guard clause:
  if (parsedRecipesArray === "ImportFailed") {
    await tx.abort();
    return "ImportFailed";
  }
  // Save the unique Recipes:
  let addedRecipesCount: number = 0;
  for (const item of parsedRecipesArray.recipesToAdd) {
    await tx.objectStore(RECIPES_STORE_NAME).add(new RecipeDBSubmit(item) as unknown as IRecipeDB);
    addedRecipesCount++;
  }
  await tx.done;
  // Return the new CoffeeBeans and Recipes counts:
  return { coffeeBeansCount: addedCoffeeBeansCount, recipesCount: addedRecipesCount };
}







// Private functions:

function parseCoffeeBeansArray(importedCoffeeBeansArray: unknown | CoffeeBeans[]): CoffeeBeans[] | "ImportFailed" {
  // Guard clause:
  if (isNullOrUndefined(importedCoffeeBeansArray) || Array.isArray(importedCoffeeBeansArray) === false) {
    alert("\"coffeeBeans\" array not found in the file.");
    return "ImportFailed";
  }
  // At this point we've proven it's an array of something.
  const _importedCoffeeBeansArray: unknown[] | ImportedJsonCoffeeBeans[] = importedCoffeeBeansArray;
  const parsedCoffeeBeansArray: CoffeeBeans[] = [];
  // Parse the CoffeeBeans items:
  for (const item of _importedCoffeeBeansArray) {
    const _item = parseCoffeeBeansItem(item);
    // Guard clause:
    if (_item === "ImportFailed") {
      return "ImportFailed";
    }
    parsedCoffeeBeansArray.push(_item);
  };
  return parsedCoffeeBeansArray;
}

function parseCoffeeBeansItem(importedItem: unknown | ImportedJsonCoffeeBeans): CoffeeBeans | "ImportFailed" {
  if (isNullOrUndefined(importedItem)) {
    return "ImportFailed";
  }
  // At this point we've proven it has a value:
  const _importedItem = importedItem as ImportedJsonCoffeeBeans;
  // Parse the Id field:
  const isValidId: boolean = checkIsValidId(_importedItem.id);
  if (isValidId === false) {
    return "ImportFailed";
  }
  // At this point we've proven it's a valid Id:
  const _id = _importedItem.id as number;
  // Parse the Name field, which is unique and has some domain requirements:
  const _name = parseTextField(_importedItem.name);
  if (_name === "") {
    return "ImportFailed";
  }
  // Parse the Description field:
  const _description = parseTextField(_importedItem.description);
  // Prepare an entity with parsed fields:
  const parsedItem: ICoffeeBeans = {
    id: _id,
    name: _name,
    description: _description
  };
  // Prepare the CoffeeBeans item:
  const item = new CoffeeBeans(parsedItem);
  return item;
}

function matchUniqueCoffeeBeansToAdd(
  parsedCoffeeBeans: CoffeeBeans[], dbCoffeeBeans: CoffeeBeans[], matchCoffeeBeansIds: Map<number, number>
): { coffeeBeansToAdd: CoffeeBeans[] } {
  const coffeeBeansToAdd: CoffeeBeans[] = [];
  for (const parsedCoffeeBeansItem of parsedCoffeeBeans) {
    // Match the imported and the DB's CoffeeBeans:
    const matchedDbItem: CoffeeBeans | undefined = dbCoffeeBeans.find(dbItem =>
      dbItem.name.toLowerCase() === parsedCoffeeBeansItem.name.toLowerCase()
    );
    // If there is a match, save the mapping between the imported and DB's CoffeeBeans Id:
    if (matchedDbItem) {
      matchCoffeeBeansIds.set(parsedCoffeeBeansItem.id, matchedDbItem.id);
      continue;
    }
    // If there isn't a match, prepare to add the new CoffeeBeans item:
    else {
      coffeeBeansToAdd.push(parsedCoffeeBeansItem);
    }
  }
  return { coffeeBeansToAdd };
}

function recipeIsPresentInDb(importedRecipe: Recipe, dbRecipes: IRecipeDB[]): boolean {
  const dbMatch: IRecipeDB | undefined = dbRecipes.find(dbItem =>
    dbItem.timestamp === importedRecipe.timestamp.getTime() &&
    dbItem.outWeight === importedRecipe.outWeight &&
    dbItem.rating === importedRecipe.rating &&
    dbItem.recipeTarget === importedRecipe.recipeTarget &&
    dbItem.recipeResult === importedRecipe.recipeResult &&
    dbItem.recipeThoughts === importedRecipe.recipeThoughts &&
    dbItem.coffeeBeansId === importedRecipe.coffeeBeansId
  );
  if (dbMatch) {
    return true;
  }
  return false;
}

function parseDbVersion(importedDbVersion: unknown | number, txDbVersion: number): number | "ImportFailed" {
  // Guard clauses:
  if (isNullOrUndefined(importedDbVersion)) {
    alert("\"dbVersion\" property not found in the file. Import aborted.");
    return "ImportFailed";
  }
  if (Number.isInteger(importedDbVersion) === false) {
    alert("\"dbVersion\" property must be an integer. Import aborted.");
    return "ImportFailed";
  }
  // At this point we've proven the DbVersion is a number;
  const parsedDbVersion = importedDbVersion as number;
  if (parsedDbVersion <= 0) {
    alert("The file's \"dbVersion\" must be higher than 0. Import aborted.");
    return "ImportFailed";
  }
  // Guard clause:
  if (parsedDbVersion > txDbVersion) {
    alert(
      `The file's "dbVersion" = ${importedDbVersion} is higher than the app's current "dbVersion" = ${txDbVersion}.
       Import aborted. Try refreshing the page and importing again. If the problem persists, please contact the
       developer.`
    );
    return "ImportFailed";
  }
  // Return the parsed DbVersion:
  return parsedDbVersion;
}





// TODO:
function parseRecipe(
  importedRecipe: unknown | ImportedJsonRecipe, dbRecipes: IRecipeDB[], matchCoffeeBeansIds: Map<number, number>
): Recipe | "RecipePresentInDb" | "ImportFailed" {
  // Parse an imported Recipe:
  if (isNullOrUndefined(importedRecipe)) {
    return "ImportFailed";
  }
  // At this point we've proven it has a value:
  const _importedRecipe = importedRecipe as ImportedJsonRecipe;
  // Parse the Id field:
  const isValidId: boolean = checkIsValidId(_importedRecipe.id);
  if (isValidId === false) {
    return "ImportFailed";
  }
  // At this point we've proven it's a valid Id:
  const _id = _importedRecipe.id as number;
  // Parse the text fields:
  const _recipeTarget = parseTextField(_importedRecipe.recipeTarget);
  const _recipeResult = parseTextField(_importedRecipe.recipeResult);
  const _recipeThoughts = parseTextField(_importedRecipe.recipeThoughts);
  // Parse the number fields:
  const _outWeight = parseNumberField(_importedRecipe.outWeight);
  const _rating = parseNumberField(_importedRecipe.rating);
  // Parse the boolean field:
  const _favorite = parseBooleanField(_importedRecipe.favorite);
  // Parse the timestamp:
  const _timestamp: Date | "ImportFailed" = parseTimestampField(_importedRecipe.timestamp);
  // Guard clause:
  if (_timestamp === "ImportFailed") {
    return "ImportFailed";
  }
  // Parse the CoffeeBeansId filed:
  const isValidCoffeeBeansId: boolean = checkIsValidId(_importedRecipe.coffeeBeansId);
  if (isValidCoffeeBeansId === false) {
    return "ImportFailed";
  }
  // At this point we've proven CoffeeBeansId is a valid Id:
  // Check that the imported CoffeeBeansId can be matched:
  if (matchCoffeeBeansIds.has(_importedRecipe.coffeeBeansId as number) === false) {
    const message =
      `Import aborted because of an internal error. Unable to match the "CoffeeBeansId" from Recipe
       ${JSON.stringify(_importedRecipe)}. Please inform the developer.`;
    console.error(message);
    return "ImportFailed";
  }
  // Set the correct CoffeeBeansId from the DB:
  const _coffeeBeansId = matchCoffeeBeansIds.get(_importedRecipe.coffeeBeansId as number)!;
  // Prepare the Recipe item:
  const _recipe: IRecipe = {
    id: _id,
    recipeTarget: _recipeTarget,
    recipeResult: _recipeResult,
    recipeThoughts: _recipeThoughts,
    outWeight: _outWeight,
    rating: _rating,
    favorite: _favorite,
    timestamp: _timestamp,
    coffeeBeansId: _coffeeBeansId
  };
  const recipe = new Recipe(_recipe);
  // Try to match the Recipe between import and DB:
  const isPresent = recipeIsPresentInDb(recipe, dbRecipes);
  if (isPresent) {
    return "RecipePresentInDb";
  }
  // The happy path:
  return recipe;
}

function parseRecipesArray(
  importedRecipes: unknown | ImportedJsonRecipe[], dbRecipes: IRecipeDB[], matchCoffeeBeansIds: Map<number, number>
): { recipesToAdd: Recipe[] } | "ImportFailed" {
  if (isNullOrUndefined(importedRecipes) || Array.isArray(importedRecipes) === false) {
    alert("\"recipes\" array not found in the file.");
    return "ImportFailed";
  }
  // Parse the imported Recipes array:
  const recipesToAdd: Recipe[] = [];
  for (const importedItem of importedRecipes) {
    const parsedItem: Recipe | "RecipePresentInDb" | "ImportFailed" = parseRecipe(
      importedItem, dbRecipes, matchCoffeeBeansIds
    );
    // Guard clause:
    if (parsedItem === "ImportFailed") {
      return "ImportFailed";
    }
    if (parsedItem instanceof Recipe) {
      recipesToAdd.push(parsedItem);
    }
  }
  return { recipesToAdd };
}




function checkIsValidId(id: unknown | number): boolean {
  if (isNullOrUndefined(id) || Number.isInteger(id) === false || id as number < 0) {
    return false;
  }
  return true;
}

function parseTextField(str: unknown | string): string {
  if (isNullOrUndefined(str) || typeof str !== "string") {
    return "";
  }
  return str;
}

function parseNumberField(num: unknown | number): number {
  if (isNullOrUndefined(num) || Number.isFinite(num) === false || num as number < 0) {
    return 0;
  }
  // At this point we've proven it's a positive integer:
  return num as number;
}

function parseBooleanField(bool: unknown | boolean): boolean {
  if (isNullOrUndefined(bool) || typeof bool !== "boolean") {
    return false;
  }
  return bool;
}

function parseTimestampField(ts: unknown | string): Date | "ImportFailed" {
  // Guard clause:
  if (isNullOrUndefined(ts) || typeof ts !== "string") {
    return "ImportFailed";
  }
  // At this point we've proven Timestamp is a string:
  // Convert string to Date:
  const _ts: Date = parseDateFromInputString(ts);
  // Guard clause:
  if (_ts.toString() === "Invalid Date") {
    return "ImportFailed";
  }
  // The happy path:
  return _ts;
}