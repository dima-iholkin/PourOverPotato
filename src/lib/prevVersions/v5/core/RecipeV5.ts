export interface IRecipe_v5 {
  id: number;
  coffeeBeansId: number;
  roastDate: Date | undefined;
  bagNumber: string;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean;
  rating: number;
  outWeight: number;
  timestamp: Date;
}