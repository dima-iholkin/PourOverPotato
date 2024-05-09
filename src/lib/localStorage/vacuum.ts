import { browser } from "$app/environment";

export function vacuumDeprecatedLocalStorageKeys() {
  // Guard clause:
  if (browser === false) {
    return;
  }
  // Iterate over the LocalStorage keys:
  for (let i = 0; i < localStorage.length; i++) {
    const keyName = localStorage.key(i);
    // Remove the keys starting with "sortOrder_":
    if (keyName?.startsWith("sortOrder_") && keyName !== "sortOrder_recipes") {
      localStorage.removeItem(keyName);
    }
  }
}