import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { _EnhancedCoffeeBeans } from "$lib/types/EnhancedCoffeeBeans";

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

export function sortCoffeeBeansByLatestRecipe(itemA: _EnhancedCoffeeBeans, itemB: _EnhancedCoffeeBeans): number {
  if (itemA.latestRecipeTimestamp === undefined) {
    return 1;
  }
  if (itemB.latestRecipeTimestamp === undefined) {
    return -1;
  }
  return itemB.latestRecipeTimestamp.getTime() - itemA.latestRecipeTimestamp.getTime();
}

export function sortCoffeeBeansByEarliestRecipe(itemA: _EnhancedCoffeeBeans, itemB: _EnhancedCoffeeBeans): number {
  if (itemA.earliestRecipeTimestamp === undefined) {
    return 1;
  }
  if (itemB.earliestRecipeTimestamp === undefined) {
    return -1;
  }
  return itemA.earliestRecipeTimestamp.getTime() - itemB.earliestRecipeTimestamp.getTime();
}