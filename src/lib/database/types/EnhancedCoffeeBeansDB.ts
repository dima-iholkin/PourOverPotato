import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import { _EnhancedCoffeeBeans, type EnhancedCoffeeBeansInfo } from "$lib/types/EnhancedCoffeeBeans";

export interface IEnhancedCoffeeBeansDB {
  id: number;
  recipesCount: number;
  latestRecipeTimestamp: number | undefined;
  earliestRecipeTimestamp: number | undefined;
}

export function toEnhancedCoffeeBeans(
  coffeeBeansItem: CoffeeBeans, info: Omit<IEnhancedCoffeeBeansDB, "id">
): _EnhancedCoffeeBeans {
  const _enhancedInfo: EnhancedCoffeeBeansInfo = {
    recipeCount: info.recipesCount,
    latestRecipeTimestamp: info.latestRecipeTimestamp ? new Date(info.latestRecipeTimestamp) : undefined,
    earliestRecipeTimestamp: info.earliestRecipeTimestamp ? new Date(info.earliestRecipeTimestamp) : undefined
  };
  return new _EnhancedCoffeeBeans(coffeeBeansItem, _enhancedInfo);
}