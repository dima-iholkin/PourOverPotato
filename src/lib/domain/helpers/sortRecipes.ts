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

export function sortRecipesByTimestampAsc(recipeA: Recipe, recipeB: Recipe): number {
  return recipeA.timestamp.getTime() - recipeB.timestamp.getTime();
}

export function sortRecipesByOutWeightDesc(recipeA: Recipe, recipeB: Recipe): number {
  return recipeB.outWeight - recipeA.outWeight;
}

export function sortRecipesByOutWeightAsc(recipeA: Recipe, recipeB: Recipe): number {
  return recipeA.outWeight - recipeB.outWeight;
}