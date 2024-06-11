export interface IRecipe {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean;
  rating: number;
  outWeight: number;
  timestamp: Date;
}

export class Recipe implements IRecipe {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean;
  rating: number;
  outWeight: number;
  timestamp: Date;

  constructor(item: IRecipe) {
    this.id = item.id;
    this.coffeeBeansId = item.coffeeBeansId;
    this.recipeTarget = item.recipeTarget;
    this.recipeResult = item.recipeResult;
    this.recipeThoughts = item.recipeThoughts;
    this.favorite = item.favorite;
    this.rating = item.rating;
    this.outWeight = item.outWeight;
    this.timestamp = item.timestamp;
  }
}

export class RecipeSubmit implements Omit<IRecipe, "id"> {
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean;
  rating: number;
  outWeight: number;
  timestamp: Date;

  constructor(item: Omit<IRecipe, "id">) {
    this.coffeeBeansId = item.coffeeBeansId;
    this.recipeTarget = item.recipeTarget;
    this.recipeResult = item.recipeResult;
    this.recipeThoughts = item.recipeThoughts;
    this.favorite = item.favorite;
    this.rating = item.rating;
    this.outWeight = item.outWeight;
    this.timestamp = item.timestamp;
  }
}