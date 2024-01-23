import type { Recipe } from "../../entities/Recipe";

// export const sortRecipesByRatingDesc = (recipeA: Recipe, recipeB: Recipe) => {
//   return recipeB.rating - recipeA.rating;
// }

export function sortRecipesByRatingDesc(recipeA: Recipe, recipeB: Recipe) {
  return recipeB.rating - recipeA.rating;
}

export function sortRecipesByTimestampDesc(recipeA: Recipe, recipeB: Recipe) {
  return recipeB.timestamp.getTime() - recipeA.timestamp.getTime();
}