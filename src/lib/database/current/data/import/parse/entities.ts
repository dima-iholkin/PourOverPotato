import type { ImportedJsonCoffeeBeans, ImportedJsonRecipe } from "$lib/database/current/types/ImportJSON";
import { CoffeeBeans, type ICoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import { Recipe, type IRecipe } from "$lib/domain/entities/Recipe";
import { isNullOrUndefined } from "$lib/helpers/undefinedHelpers";
import { checkIsValidId, parseBooleanField, parseNumberField, parseTextField, parseTimestampField } from "./primitives";

export function parseCoffeeBeansItem(importedItem: unknown | ImportedJsonCoffeeBeans): CoffeeBeans | "ImportFailed" {
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

export function parseRecipe(
  importedRecipe: unknown | ImportedJsonRecipe, matchCoffeeBeansIds: Map<number, number>
): Recipe | "ImportFailed" {
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
  // The happy path:
  return recipe;
}