import { browser } from "$app/environment";

export function vacuumDeprecatedRecipeSortOrderSaves() {
  // Guard clause:
  if (browser === false) {
    return;
  }
  // Clean up logic:
  for (let i = 0; i < localStorage.length; i++) {
    const keyName = localStorage.key(i);
    if (keyName?.startsWith("sortOrder_") && keyName !== "sortOrder_recipes") {
      localStorage.removeItem(keyName);
    }
  }
}