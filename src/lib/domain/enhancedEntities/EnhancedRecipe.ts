import type { Recipe } from "$lib/domain/entities/Recipe";

export type EnhancedRecipe = Recipe & {
  coffeeBeansName: string
};

export function createEnhancedRecipe(recipe: Recipe, coffeeBeansName: string): EnhancedRecipe {
  const obj: EnhancedRecipe = Object.assign(recipe, { coffeeBeansName });
  return obj;
}