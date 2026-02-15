import type { DBSchema } from "idb";
import type { ICoffeeBeansDB_v4 } from "./CoffeeBeansDBv4";
import type { IEnhancedCoffeeBeansDB_v4 } from "./EnhancedCoffeeBeansDBv4";
import type { IRecipeDB_v4 } from "./RecipeDBv4";

export interface EntitiesDB_v4 extends DBSchema {
  coffeeBeans: {
    key: number;
    value: ICoffeeBeansDB_v4;
    indexes: {
      nameLowerCase: string;
      softDeletionTimestamp: number;
    };
  };
  enhancedCoffeeBeans: {
    key: number;
    value: IEnhancedCoffeeBeansDB_v4;
  }
  recipes: {
    key: number;
    value: IRecipeDB_v4;
    indexes: {
      coffeeBeansId: number;
      outWeight: number;
      rating: number;
      timestamp: number;
      softDeletionTimestamp: number;
    };
  };
}