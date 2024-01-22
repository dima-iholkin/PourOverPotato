export interface Recipe {
  id: number;
  coffeeBeansId: number;
  recipeAim: string;
  recipeOutput: string;
  outputWeight: number;
  rating: number;
  opinion: string;
  timestamp: Date;
}

export type RecipeSubmit = Omit<Recipe, "id">;