import { Recipe, RecipeSubmit } from "$lib/domain/entities/Recipe";

export interface IRecipeDB {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean | undefined;
  rating: number;
  outWeight: number;
  timestamp: number;
  softDeleted?: boolean;
}

export class RecipeDB implements IRecipeDB {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean | undefined;
  rating: number;
  outWeight: number;
  timestamp: number;
  softDeleted?: boolean;

  constructor(item: Omit<IRecipeDB, "id">, id: number) {
    this.id = id;
    this.coffeeBeansId = item.coffeeBeansId;
    this.recipeTarget = item.recipeTarget;
    this.recipeResult = item.recipeResult;
    this.recipeThoughts = item.recipeThoughts;
    this.favorite = item.favorite;
    this.rating = item.rating;
    this.outWeight = item.outWeight;
    this.timestamp = item.timestamp;
    this.softDeleted = item.softDeleted;
  }

  toRecipe() {
    const obj: Omit<Recipe, "id"> = {
      coffeeBeansId: this.coffeeBeansId,
      recipeTarget: this.recipeTarget,
      recipeResult: this.recipeResult,
      recipeThoughts: this.recipeThoughts,
      favorite: this.favorite,
      rating: this.rating,
      outWeight: this.outWeight,
      timestamp: new Date(this.timestamp)
    };

    return new Recipe(obj, this.id);
  }
}

export class RecipeDBSubmit implements Omit<RecipeDB, "id" | "toRecipe"> {
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean | undefined;
  rating: number;
  outWeight: number;
  timestamp: number;
  softDeleted?: boolean;

  constructor(recipe: RecipeSubmit) {
    this.coffeeBeansId = recipe.coffeeBeansId;
    this.recipeTarget = recipe.recipeTarget;
    this.recipeResult = recipe.recipeResult;
    this.recipeThoughts = recipe.recipeThoughts;
    this.favorite = recipe.favorite;
    this.rating = recipe.rating;
    this.outWeight = recipe.outWeight;
    this.timestamp = recipe.timestamp.getTime();
    this.softDeleted = false;
  }
}