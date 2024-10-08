import type { DBSchema } from "idb";
import type { ICoffeeBeansDB } from "./CoffeeBeansDB";
import type { IEnhancedCoffeeBeansDB } from "./EnhancedCoffeeBeansDB";
import type { IRecipeDB } from "./RecipeDB";

export interface EntitiesDB extends DBSchema {
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
