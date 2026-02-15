import type { DBSchema } from "idb";
import type { ICoffeeBeansDB } from "$lib/database/models/CoffeeBeansDB";
import type { IEnhancedCoffeeBeansDB } from "$lib/database/models/EnhancedCoffeeBeansDB";
import type { IRecipeDB } from "$lib/database/models/RecipeDB";

export interface EntitiesDbSchema extends DBSchema {
  coffeeBeans: {
    key: number;
    value: ICoffeeBeansDB;
    indexes: {
      nameLowerCase: string;
      softDeletionTimestamp: number;
    };
  };
  enhancedCoffeeBeans: {
    key: number;
    value: IEnhancedCoffeeBeansDB;
  }
  recipes: {
    key: number;
    value: IRecipeDB;
    indexes: {
      coffeeBeansId: number;
      roastDate: number;
      bagNumber: string;
      outWeight: number;
      rating: number;
      timestamp: number;
      softDeletionTimestamp: number;
    };
  };
}
