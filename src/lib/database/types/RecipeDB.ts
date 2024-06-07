import { Recipe, RecipeSubmit, type IRecipe } from "$lib/domain/entities/Recipe";

export interface IRecipeDB extends Omit<IRecipe, "timestamp"> {
  timestamp: number;
  softDeleted: 0 | 1;
}

export class RecipeDB implements IRecipeDB {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean;
  rating: number;
  outWeight: number;
  timestamp: number;
  softDeleted: 0 | 1;

  constructor(item: IRecipeDB) {
    this.id = item.id;
    this.coffeeBeansId = item.coffeeBeansId;
    this.recipeTarget = item.recipeTarget;
    this.recipeResult = item.recipeResult;
    this.recipeThoughts = item.recipeThoughts;
    this.favorite = item.favorite ?? false;
    this.rating = item.rating;
    this.outWeight = item.outWeight;
    this.timestamp = item.timestamp;
    this.softDeleted = item.softDeleted ?? false;
  }

  static fromRecipe(item: Recipe): RecipeDB {
    const obj: IRecipeDB = {
      ...item,
      timestamp: item.timestamp.getTime(),
      softDeleted: 0 // Because the core Recipe entity doesn't even have the concept of "softDeleted".
    };
    return new RecipeDB(obj);
  }

  toRecipe(): Recipe {
    const obj: IRecipe = {
      ...this,
      favorite: this.favorite ?? false,
      timestamp: new Date(this.timestamp)
    };
    return new Recipe(obj);
  }
}

export class RecipeDBSubmit implements Omit<IRecipeDB, "id"> {
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean;
  rating: number;
  outWeight: number;
  timestamp: number;
  softDeleted: 0 | 1;

  constructor(recipe: RecipeSubmit) {
    this.coffeeBeansId = recipe.coffeeBeansId;
    this.recipeTarget = recipe.recipeTarget;
    this.recipeResult = recipe.recipeResult;
    this.recipeThoughts = recipe.recipeThoughts;
    this.favorite = recipe.favorite ?? false;
    this.rating = recipe.rating;
    this.outWeight = recipe.outWeight;
    this.timestamp = recipe.timestamp.getTime();
    this.softDeleted = 0;
  }

  toRecipeDB(recipeDbSubmit: RecipeDBSubmit, id: number): RecipeDB {
    return new RecipeDB({ ...recipeDbSubmit, id });
  }
}