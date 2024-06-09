import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { EnhancedCoffeeBeans } from "$lib/types/EnhancedCoffeeBeans";

export function sortCoffeeBeansByName(itemA: CoffeeBeans, itemB: CoffeeBeans): number {
  if (itemA.name < itemB.name) {
    return -1;
  }
  if (itemA.name > itemB.name) {
    return 1;
  }
  return 0;
}

export function sortCoffeeBeansByNameReverse(itemA: CoffeeBeans, itemB: CoffeeBeans) {
  return -sortCoffeeBeansByName(itemA, itemB);
}

export function sortCoffeeBeansByLatestRecipe(itemA: EnhancedCoffeeBeans, itemB: EnhancedCoffeeBeans): number {
  // Secondary sort order:
  if (itemA.latestRecipeTimestamp === itemB.latestRecipeTimestamp) {
    return sortCoffeeBeansByName(itemA, itemB);
  }
  // Guard clauses:
  if (itemA.latestRecipeTimestamp === undefined) {
    return 1;
  }
  if (itemB.latestRecipeTimestamp === undefined) {
    return -1;
  }
  // Primary sort order:
  return itemB.latestRecipeTimestamp.getTime() - itemA.latestRecipeTimestamp.getTime();
}

export function sortCoffeeBeansByEarliestRecipe(itemA: EnhancedCoffeeBeans, itemB: EnhancedCoffeeBeans): number {
  // Secondary sort order:
  if (itemA.latestRecipeTimestamp === itemB.latestRecipeTimestamp) {
    return sortCoffeeBeansByName(itemA, itemB);
  }
  // Guard clauses:
  if (itemA.earliestRecipeTimestamp === undefined) {
    return 1;
  }
  if (itemB.earliestRecipeTimestamp === undefined) {
    return -1;
  }
  // Primary sort order:
  return itemA.earliestRecipeTimestamp.getTime() - itemB.earliestRecipeTimestamp.getTime();
}

export function sortCoffeeBeansByMoreRecipes(itemA: EnhancedCoffeeBeans, itemB: EnhancedCoffeeBeans): number {
  // Secondary sort order:
  if (itemA.recipeCount === itemB.recipeCount) {
    return sortCoffeeBeansByName(itemA, itemB);
  }
  // Primary sort order:
  return itemB.recipeCount - itemA.recipeCount;
}

export function sortCoffeeBeansByLessRecipes(itemA: EnhancedCoffeeBeans, itemB: EnhancedCoffeeBeans): number {
  // Secondary sort order:
  if (itemA.recipeCount === itemB.recipeCount) {
    return sortCoffeeBeansByName(itemA, itemB);
  }
  // Primary sort order:
  return itemA.recipeCount - itemB.recipeCount;
}