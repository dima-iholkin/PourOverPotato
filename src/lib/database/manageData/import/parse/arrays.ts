import type { ImportedJsonCoffeeBeans, ImportedJsonRecipe } from "$lib/database/types/ImportJSON";
import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { Recipe } from "$lib/domain/entities/Recipe";
import { isNullOrUndefined } from "$lib/helpers/undefinedHelpers";
import { parseCoffeeBeansItem, parseRecipe } from "./entities";

export function parseCoffeeBeansArray(
  importedCoffeeBeansArray: unknown | CoffeeBeans[]
): CoffeeBeans[] | "ImportFailed" {
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

export function parseRecipesArray(
  importedRecipes: unknown | ImportedJsonRecipe[], matchCoffeeBeansIds: Map<number, number>
): Recipe[] | "ImportFailed" {
  if (isNullOrUndefined(importedRecipes) || Array.isArray(importedRecipes) === false) {
    alert("\"recipes\" array not found in the file.");
    return "ImportFailed";
  }
  // Parse the imported Recipes array:
  const parsedRecipes: Recipe[] = [];
  for (const importedItem of importedRecipes) {
    const parsedItem: Recipe | "ImportFailed" = parseRecipe(importedItem, matchCoffeeBeansIds);
    // Guard clause:
    if (parsedItem === "ImportFailed") {
      return "ImportFailed";
    }
    parsedRecipes.push(parsedItem);
  }
  return parsedRecipes;
}