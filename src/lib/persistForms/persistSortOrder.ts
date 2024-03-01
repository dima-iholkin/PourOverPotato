import { browser } from "$app/environment";
import { RecipesSortOrderEnum } from "$lib/UI/domain-components/lists/SortRecipesSelect/RecipesSortOrderEnum";

// Public API:

export function loadSortOrder(id: string): RecipesSortOrderEnum {
  if (browser === false) {
    return RecipesSortOrderEnum.Latest;
  }

  const key = generateKey(id);
  const valueStr: string | null = localStorage.getItem(key);

  if (valueStr === null) {
    return RecipesSortOrderEnum.Latest;
  }

  const valueNum: number = Number.parseInt(valueStr);

  if (Number.isNaN(valueNum)) {
    return RecipesSortOrderEnum.Latest;
  }

  if (valueNum in RecipesSortOrderEnum) {
    return valueNum;
  }

  console.warn("loadSortOrder function read value from LocalStorage not present in RecipesSortOrderEnum.");
  return RecipesSortOrderEnum.Latest;
}

export function saveSortOrder(id: string, value: RecipesSortOrderEnum) {
  if (browser === false) {
    return;
  }

  const key = generateKey(id);
  localStorage.setItem(key, value as unknown as string);
}

// Helper functions:

function generateKey(id: string) {
  return `sortOrder_${id}`;
}