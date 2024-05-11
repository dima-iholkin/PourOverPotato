import { browser } from "$app/environment";
import type {
  CoffeeBeansSortOrderEnum
} from "$lib/UI/domainComponents/lists/SortCoffeeBeansSelect/CoffeeBeansSortOrderEnum";
import { RecipesSortOrderEnum } from "$lib/UI/domainComponents/lists/SortRecipesSelect/RecipesSortOrderEnum";

// Public functions:

export function loadSortOrder<T extends RecipesSortOrderEnum | CoffeeBeansSortOrderEnum>(
  type: "recipes" | "coffeeBeans"
): T {
  // Guard clause:
  if (browser === false) {
    // Return the first value in the Enum:
    return 0 as T;
  }
  // Read value from LocalStorage:
  const valueStr: string | null = localStorage.getItem(`sortOrder_${type}`);
  // Guard clause:
  if (valueStr === null) {
    // Return the first value in the Enum:
    return 0 as T;
  }
  // Parse the number from the LocalStorage string:
  const valueNum: number = Number.parseInt(valueStr);
  // Guard clause:
  if (Number.isNaN(valueNum)) {
    console.warn(`Error reading sortOrder_${type} from LocalStorage, value was: ${valueStr}.`);
    // Return the first value in the Enum:
    return 0 as T;
  }
  // Return the Enum value:
  return valueNum as T;
}

export function saveSortOrder<T extends RecipesSortOrderEnum | CoffeeBeansSortOrderEnum>(
  type: "recipes" | "coffeeBeans", value: T
): void {
  // Guard clause:
  if (browser === false) {
    return;
  }
  // Save to the LocalStorage:
  localStorage.setItem(`sortOrder_${type}`, value as unknown as string);
}