export class Recipe {
  id: number;
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean | undefined;
  rating: number;
  outWeight: number;
  timestamp: Date;

  constructor(item: Omit<Recipe, "id">, id: number) {
    this.id = id;
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

export class RecipeSubmit implements Omit<Recipe, "id"> {
  coffeeBeansId: number;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean | undefined;
  rating: number;
  outWeight: number;
  timestamp: Date;

  constructor(item: Omit<Recipe, "id">) {
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