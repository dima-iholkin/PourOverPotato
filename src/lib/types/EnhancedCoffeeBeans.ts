import { CoffeeBeans, type ICoffeeBeans } from "$lib/domain/entities/CoffeeBeans";

export class EnhancedCoffeeBeans extends CoffeeBeans {
  recipeCount: number;
  latestRecipeTimestamp: Date | undefined;
  earliestRecipeTimestamp: Date | undefined;

  constructor(coffeeBeansItem: ICoffeeBeans, enhancedInfo: EnhancedCoffeeBeansInfo) {
    super(coffeeBeansItem);
    this.recipeCount = enhancedInfo.recipeCount;
    this.latestRecipeTimestamp = enhancedInfo.latestRecipeTimestamp;
    this.earliestRecipeTimestamp = enhancedInfo.earliestRecipeTimestamp;
  }
}

export interface EnhancedCoffeeBeansInfo {
  recipeCount: number;
  latestRecipeTimestamp: Date | undefined;
  earliestRecipeTimestamp: Date | undefined;
}