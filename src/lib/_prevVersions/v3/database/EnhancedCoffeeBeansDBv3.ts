export interface IEnhancedCoffeeBeansDB_v3 {
  id: number;
  recipesCount: number;
  latestRecipeTimestamp: number | undefined;
  earliestRecipeTimestamp: number | undefined;
}