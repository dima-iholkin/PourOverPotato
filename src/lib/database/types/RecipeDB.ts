import { Recipe, RecipeSubmit, type IRecipe } from "$lib/domain/entities/Recipe";

export interface IRecipeDB extends Omit<IRecipe, "timestamp" | "roastDate" | "bagNumber"> {
  roastDate: number | undefined;
  bagNumber: string | undefined;
  timestamp: number;
  softDeletionTimestamp: number | undefined;
}

export class RecipeDB implements IRecipeDB {
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

  constructor(item: IRecipeDB) {
    this.id = item.id;
    this.coffeeBeansId = item.coffeeBeansId;
    this.roastDate = item.roastDate;
    this.bagNumber = item.bagNumber;
    this.recipeTarget = item.recipeTarget;
    this.recipeResult = item.recipeResult;
    this.recipeThoughts = item.recipeThoughts;
    this.favorite = item.favorite ?? false;
    this.rating = item.rating;
    this.outWeight = item.outWeight;
    this.timestamp = item.timestamp;
    this.softDeletionTimestamp = item.softDeletionTimestamp;
  }

  static fromRecipe(item: Recipe): RecipeDB {
    // Convert an effectively 0-value roast date to undefined, for better index and storage usage:
    let _roastDate: number | undefined;
    if (item.roastDate === undefined || item.roastDate.getTime() === 0) {
      _roastDate = undefined;
    } else {
      _roastDate = item.roastDate.getTime();
    }
    // Convert and effectively empty bag number to undefined, for better index and storage usage:
    let _bagNumber: string | undefined;
    if (item.bagNumber === "") {
      _bagNumber = undefined;
    } else {
      _bagNumber = item.bagNumber;
    }
    // Assemble and create the instance:
    const obj: IRecipeDB = {
      ...item,
      roastDate: _roastDate,
      bagNumber: _bagNumber,
      timestamp: item.timestamp.getTime(),
      softDeletionTimestamp: undefined // Because the core Recipe entity doesn't even have the concept of "softDeleted".
    };
    return new RecipeDB(obj);
  }

  toRecipe(): Recipe {
    const obj: IRecipe = {
      ...this,
      roastDate: this.roastDate ? new Date(this.roastDate) : undefined,
      bagNumber: this.bagNumber ?? "",
      favorite: this.favorite ?? false,
      timestamp: new Date(this.timestamp)
    };
    return new Recipe(obj);
  }
}

export class RecipeDBSubmit implements Omit<IRecipeDB, "id"> {
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

  constructor(recipe: RecipeSubmit) {
    // Convert an effectively 0-value roast date to undefined, for better index and storage usage:
    let _roastDate: number | undefined;
    if (recipe.roastDate === undefined || recipe.roastDate.getTime() === 0) {
      _roastDate = undefined;
    } else {
      _roastDate = recipe.roastDate.getTime();
    }
    // Convert and effectively empty bag number to undefined, for better index and storage usage:
    let _bagNumber: string | undefined;
    if (recipe.bagNumber === "") {
      _bagNumber = undefined;
    } else {
      _bagNumber = recipe.bagNumber;
    }
    this.coffeeBeansId = recipe.coffeeBeansId;
    this.roastDate = _roastDate;
    this.bagNumber = _bagNumber;
    this.recipeTarget = recipe.recipeTarget;
    this.recipeResult = recipe.recipeResult;
    this.recipeThoughts = recipe.recipeThoughts;
    this.favorite = recipe.favorite ?? false;
    this.rating = recipe.rating;
    this.outWeight = recipe.outWeight;
    this.timestamp = recipe.timestamp.getTime();
    this.softDeletionTimestamp = undefined;
  }

  toRecipeDB(recipe: RecipeDBSubmit, id: number): RecipeDB {
    return new RecipeDB({ ...recipe, id });
  }
}