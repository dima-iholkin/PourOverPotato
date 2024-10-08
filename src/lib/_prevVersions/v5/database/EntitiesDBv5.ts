import type { DBSchema } from "idb";
import type { ICoffeeBeansDB_v5 } from "./CoffeeBeansDBv5";
import type { IEnhancedCoffeeBeansDB_v5 } from "./EnhancedCoffeeBeansDBv5";
import type { IRecipeDB_v5 } from "./RecipeDBv5";

export interface EntitiesDB_v5 extends DBSchema {
  coffeeBeans: {
    key: number;
    value: ICoffeeBeansDB_v5;
    indexes: {
      nameLowerCase: string;
      softDeletionTimestamp: number;
    };
  };
  enhancedCoffeeBeans: {
    key: number;
    value: IEnhancedCoffeeBeansDB_v5;
  }
  recipes: {
    key: number;
    value: IRecipeDB_v5;
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