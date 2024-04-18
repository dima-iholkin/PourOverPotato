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

export function sortCoffeeBeansByName(itemA: CoffeeBeans, itemB: CoffeeBeans): number {
  if (itemA.name < itemB.name) {
    return -1;
  }

  if (itemA.name > itemB.name) {
    return 1;
  }

  return 0;
}

export function sortRecipesByRatingDesc(recipeA: Recipe, recipeB: Recipe): number {
  if (recipeA.rating === recipeB.rating) {
    return sortRecipesByTimestampDesc(recipeA, recipeB);
  }

  return recipeB.rating - recipeA.rating;
}

export function sortRecipesByRatingAsc(recipeA: Recipe, recipeB: Recipe): number {
  return -sortRecipesByRatingDesc(recipeA, recipeB);
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

export function sortRecipesByFavorite(recipeA: Recipe, recipeB: Recipe): number {
  if (recipeA.favorite === true && recipeB.favorite === true) {
    return sortRecipesByRatingDesc(recipeA, recipeB);
  }

  if (
    (recipeA.favorite === false || recipeA.favorite === undefined)
    && (recipeB.favorite === false || recipeB.favorite === undefined)
  ) {
    return sortRecipesByRatingDesc(recipeA, recipeB);
  }

  if (recipeA.favorite === true) {
    return -1;
  }

  if (recipeB.favorite === true) {
    return 1;
  }

  return 0;
}