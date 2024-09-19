export interface IRecipeDB_v5 {
  id: number;
  coffeeBeansId: number;
  roastDate: number | undefined;
  bagNumber: string | undefined;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean;
  rating: number;
  outWeight: number;
  timestamp: number;
  softDeletionTimestamp: number | undefined;
}