import type { Recipe } from "$lib/domain/entities/Recipe";

export type EnhancedRecipe = Recipe & {
  coffeeBeansName: string
};