import type { DBSchema } from "idb";
import type { ICoffeeBeansDB_v3 } from "./CoffeeBeansDBv3";
import type { IEnhancedCoffeeBeansDB_v3 } from "./EnhancedCoffeeBeansDBv3";
import type { IRecipeDB_v3 } from "./RecipeDBv3";

export interface EntitiesDB_v3 extends DBSchema {
  coffeeBeans: {
    key: number;
    value: ICoffeeBeansDB_v3;
    indexes: {
      nameLowerCase: string;
      softDeletionTimestamp: number;
    };
  };
  enhancedCoffeeBeans: {
    key: number;
    value: IEnhancedCoffeeBeansDB_v3;
  }
  recipes: {
    key: number;
    value: IRecipeDB_v3;
    indexes: {
      coffeeBeansId: number;
      outWeight: number;
      rating: number;
      timestamp: number;
      softDeletionTimestamp: number;
    };
  };
}