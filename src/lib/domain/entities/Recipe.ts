export interface IRecipe {
  id: number;
  coffeeBeansId: number;
  roastDate: Date;
  bagNumber: string;
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
  roastDate: Date;
  bagNumber: string;
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
    this.roastDate = item.roastDate;
    this.bagNumber = item.bagNumber;
    this.recipeTarget = item.recipeTarget;
    this.recipeResult = item.recipeResult;
    this.recipeThoughts = item.recipeThoughts;
    this.favorite = item.favorite;
    this.rating = item.rating;
    this.outWeight = item.outWeight;
    this.timestamp = item.timestamp;
  }

  get daysSinceRoast(): number | undefined {
    // Guard clause:
    if (this.roastDate === undefined || this.roastDate instanceof Date === false || this.roastDate.getTime() === 0) {
      return undefined;
    }
    // Set both dates' time to 12:00:
    const _roastDate = new Date(
      this.roastDate.getFullYear(), this.roastDate.getMonth(), this.roastDate.getDate(), 12, 0, 0, 0
    );
    const _brewDate = new Date(
      this.timestamp.getFullYear(), this.timestamp.getMonth(), this.timestamp.getDate(), 12, 0, 0, 0
    );
    // Calculate the days since roast:
    const roastTimestamp: number = _roastDate.getTime();
    const brewTimestamp: number = _brewDate.getTime();
    return Math.round((brewTimestamp - roastTimestamp) / (1000 * 60 * 60 * 24));
  }

  static calculateDaysSinceRoast(brewDate: Date, roastDate: Date | undefined): number | undefined {
    // Guard clause:
    if (roastDate === undefined || roastDate instanceof Date === false || roastDate.getTime() === 0) {
      return undefined;
    }
    // Set both dates' time to 12:00:
    const _roastDate = new Date(
      roastDate.getFullYear(), roastDate.getMonth(), roastDate.getDate(), 12, 0, 0, 0
    );
    const _brewDate = new Date(
      brewDate.getFullYear(), brewDate.getMonth(), brewDate.getDate(), 12, 0, 0, 0
    );
    // Calculate the days since roast:
    const roastTimestamp: number = _roastDate.getTime();
    const brewTimestamp: number = _brewDate.getTime();
    return Math.round((brewTimestamp - roastTimestamp) / (1000 * 60 * 60 * 24));
  }
}

export class RecipeSubmit implements Omit<IRecipe, "id"> {
  coffeeBeansId: number;
  roastDate: Date;
  bagNumber: string;
  recipeTarget: string;
  recipeResult: string;
  recipeThoughts: string;
  favorite: boolean;
  rating: number;
  outWeight: number;
  timestamp: Date;

  constructor(item: Omit<IRecipe, "id">) {
    this.coffeeBeansId = item.coffeeBeansId;
    this.roastDate = item.roastDate;
    this.bagNumber = item.bagNumber;
    this.recipeTarget = item.recipeTarget;
    this.recipeResult = item.recipeResult;
    this.recipeThoughts = item.recipeThoughts;
    this.favorite = item.favorite;
    this.rating = item.rating;
    this.outWeight = item.outWeight;
    this.timestamp = item.timestamp;
  }
}