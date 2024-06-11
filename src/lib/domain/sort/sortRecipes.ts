import type { Recipe } from "$lib/domain/entities/Recipe";

export function sortRecipesByFavorite(recipeA: Recipe, recipeB: Recipe): number {
  // Secondary sort order:
  if (recipeA.favorite === recipeB.favorite) {
    return sortRecipesByRatingDesc(recipeA, recipeB);
  }
  // Primary sort order:
  if (recipeA.favorite === true) {
    return -1;
  }
  if (recipeB.favorite === true) {
    return 1;
  }
  return 0;
}

export function sortRecipesByOutWeightAsc(recipeA: Recipe, recipeB: Recipe): number {
  // Secondary sort order:
  if (recipeA.outWeight === recipeB.outWeight) {
    return sortRecipesByTimestampDesc(recipeA, recipeB);
  }
  // Primary sort order:
  return recipeA.outWeight - recipeB.outWeight;
}

export function sortRecipesByOutWeightDesc(recipeA: Recipe, recipeB: Recipe): number {
  // Secondary sort order:
  if (recipeA.outWeight === recipeB.outWeight) {
    return sortRecipesByTimestampDesc(recipeA, recipeB);
  }
  // Primary sort order:
  return recipeB.outWeight - recipeA.outWeight;
}

export function sortRecipesByRatingAsc(recipeA: Recipe, recipeB: Recipe): number {
  // Secondary sort order:
  if (recipeA.rating === recipeB.rating) {
    return sortRecipesByTimestampDesc(recipeA, recipeB);
  }
  // Primary sort order:
  return recipeA.rating - recipeB.rating;
}

export function sortRecipesByRatingDesc(recipeA: Recipe, recipeB: Recipe): number {
  // Secondary sort order:
  if (recipeA.rating === recipeB.rating) {
    return sortRecipesByTimestampDesc(recipeA, recipeB);
  }
  // Primary sort order:
  return recipeB.rating - recipeA.rating;
}

export function sortRecipesByTimestampAsc(recipeA: Recipe, recipeB: Recipe): number {
  return recipeA.timestamp.getTime() - recipeB.timestamp.getTime();
}

export function sortRecipesByTimestampDesc(recipeA: Recipe, recipeB: Recipe): number {
  return recipeB.timestamp.getTime() - recipeA.timestamp.getTime();
}