import { browser } from "$app/environment";
import { RecipesSortOrderEnum } from "$lib/UI/domain-components/lists/SortRecipesSelect/RecipesSortOrderEnum";

// Public API:

export function loadSortOrder(): RecipesSortOrderEnum {
  // Guard clause:
  if (browser === false) {
    return RecipesSortOrderEnum.Latest;
  }

  // Load logic:
  const valueStr: string | null = localStorage.getItem("sortOrder_recipes");
  // Guard clause:
  if (valueStr === null) {
    return RecipesSortOrderEnum.Latest;
  }

  // Parse value from string:
  const valueNum: number = Number.parseInt(valueStr);
  // Guard clause:
  if (Number.isNaN(valueNum) || (valueNum in RecipesSortOrderEnum) === false) {
    console.warn("loadSortOrder function read value from LocalStorage not present in RecipesSortOrderEnum.");
    return RecipesSortOrderEnum.Latest;
  }

  // Happy path return:
  return valueNum;
}

export function saveSortOrder(value: RecipesSortOrderEnum) {
  // Guard clause:
  if (browser === false) {
    return;
  }

  // Save logic:
  localStorage.setItem("sortOrder_recipes", value as unknown as string);
}