import { Recipe, RecipeSubmit } from "$lib/domain/entities/Recipe";

export interface IRecipeDB {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  rating: number;
  outWeight: number;
  timestamp: Date;
}

export class RecipeDB implements IRecipeDB {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  rating: number;
  outWeight: number;
  timestamp: Date;

  constructor(item: Omit<IRecipeDB, "id">, id: number) {
    this.id = id;
    this.coffeeBeansId = item.coffeeBeansId;
    this.recipeTarget = item.recipeTarget;
    this.recipeResult = item.recipeResult;
    this.recipeThoughts = item.recipeThoughts;
    this.rating = item.rating;
    this.outWeight = item.outWeight;
    this.timestamp = item.timestamp;
  }

  toRecipe() {
    return new Recipe(this, this.id);
  }
}

export class RecipeDBSubmit implements Omit<RecipeDB, "id" | "toRecipe"> {
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  rating: number;
  outWeight: number;
  timestamp: Date;

  constructor(item: RecipeSubmit) {
    this.coffeeBeansId = item.coffeeBeansId;
    this.recipeTarget = item.recipeTarget;
    this.recipeResult = item.recipeResult;
    this.recipeThoughts = item.recipeThoughts;
    this.rating = item.rating;
    this.outWeight = item.outWeight;
    this.timestamp = item.timestamp;
  }
}