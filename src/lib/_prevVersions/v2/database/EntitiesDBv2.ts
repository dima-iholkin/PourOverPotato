import type { DBSchema } from "idb";
import type { ICoffeeBeansDB_v2 } from "./CoffeeBeansDBv2";
import type { IRecipeDB_v2 } from "./RecipeDBv2";

export interface EntitiesDB_v2 extends DBSchema {
  coffeeBeans: {
    key: number;
    value: ICoffeeBeansDB_v2;
    indexes: {
      nameLowerCase: string;
    };
  };
  recipes: {
    key: number;
    value: IRecipeDB_v2;
    indexes: {
      coffeeBeansId: number;
      outWeight: number;
      rating: number;
      timestamp: number;
    };
  };
}