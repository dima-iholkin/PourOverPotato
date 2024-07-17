export interface IRecipe_v3 {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean;
  rating: number;
  outWeight: number;
  timestamp: Date;
}