import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { Recipe } from "$lib/domain/entities/Recipe";

export function sortCoffeeBeansByTimestampDesc(
  itemA: CoffeeBeans & { latestRecipeTimestamp: Date | undefined },
  itemB: CoffeeBeans & { latestRecipeTimestamp: Date | undefined }
): number {
  if (itemA.latestRecipeTimestamp === undefined) {
    return 1;
  }
  if (itemB.latestRecipeTimestamp === undefined) {
    return -1;
  }

  return itemB.latestRecipeTimestamp.getTime() - itemA.latestRecipeTimestamp.getTime();
}

export function sortRecipesByRatingDesc(recipeA: Recipe, recipeB: Recipe): number {
  return recipeB.rating - recipeA.rating;
}

export function sortRecipesByTimestampDesc(recipeA: Recipe, recipeB: Recipe): number {
  return recipeB.timestamp.getTime() - recipeA.timestamp.getTime();
}
