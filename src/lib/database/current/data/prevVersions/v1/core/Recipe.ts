export interface IRecipe_v1 {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  rating: number;
  outWeight: number;
  timestamp: Date;
}