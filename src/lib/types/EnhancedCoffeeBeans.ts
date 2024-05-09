import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";

export type EnhancedCoffeeBeans = CoffeeBeans & {
  recipeCount: number | undefined;
  latestRecipeTimestamp?: Date | undefined;
  earliestRecipeTimestamp?: Date | undefined;
}