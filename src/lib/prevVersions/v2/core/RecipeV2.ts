export interface IRecipe_v2 {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean | undefined;
  rating: number;
  outWeight: number;
  timestamp: Date;
}