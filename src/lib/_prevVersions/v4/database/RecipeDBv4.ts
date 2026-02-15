export interface IRecipeDB_v4 {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean;
  rating: number;
  outWeight: number;
  timestamp: number;
  softDeletionTimestamp: number | undefined;
}