export interface Recipe {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeOutput: string;
  opinion: string;
  rating: number;
  outputWeight: number;
  timestamp: Date;
}

export type RecipeSubmit = Omit<Recipe, "id">;