export interface Recipe {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  rating: number;
  outWeight: number;
  timestamp: Date;
}

export type RecipeSubmit = Omit<Recipe, "id">;