export interface IEnhancedCoffeeBeansDB {
  id: number;
  recipesCount: number;
  latestRecipeTimestamp: number | undefined;
  earliestRecipeTimestamp: number | undefined;
}