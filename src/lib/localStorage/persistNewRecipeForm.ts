import { browser } from "$app/environment";
import type { Recipe } from "$lib/domain/entities/Recipe";
import { parseDateFromInputString } from "$lib/helpers/dateHelpers";

// Constants:
const KEY = "form_addRecipe";

export function saveNewRecipeFormState(recipe: Partial<Omit<Recipe, "id" | "timestamp">>) {
  // Guard clause, if this code doesn't run in the browser, Local Storage is not available:
  if (browser === false) {
    return;
  }
  // Stringify the object:
  const objStr: string = JSON.stringify(recipe);
  // Load the old JSON string from Local Storage:
  const objStr_old: string | null = localStorage.getItem(KEY);
  // Guard clause, if the old and the new objects are the same, don't write to Local Storage:
  if (objStr === objStr_old) {
    // console.log("the old and the new objects are the same");
    return;
  }
  // Save the object to Local Storage:
  localStorage.setItem(KEY, objStr);
}

export function loadNewRecipeFormState(): Partial<Omit<Recipe, "id" | "timestamp">> | undefined {
  // Guard clause:
  if (browser === false) {
    return;
  }
  // Load the JSON string from Local Storage:
  const objStr: string | null = localStorage.getItem(KEY);
  // Guard clause:
  if (objStr === null) {
    return;
  }
  // Parse the object from JSON string:
  const obj: Partial<Omit<Recipe, "id" | "timestamp">> = JSON.parse(objStr);
  obj.roastDate = obj.roastDate ? parseDateFromInputString(obj.roastDate as unknown as string) : undefined;
  return obj;
}

export function clearNewRecipeFormState() {
  // Guard clause:
  if (browser === false) {
    return;
  }
  // Remove the key:
  localStorage.removeItem(KEY);
}