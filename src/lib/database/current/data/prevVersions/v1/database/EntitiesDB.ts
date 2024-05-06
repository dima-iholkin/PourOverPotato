import type { DBSchema } from "idb";
import type { ICoffeeBeansDB_v1 } from "./CoffeeBeansDB";
import type { IRecipeDB_v1 } from "./RecipeDB";

export interface EntitiesDB_v1 extends DBSchema {
  coffeeBeans: {
    key: number;
    value: ICoffeeBeansDB_v1;
    indexes: {
      nameLowerCase: string;
    };
  };
  recipes: {
    key: number;
    value: IRecipeDB_v1;
    indexes: {
      coffeeBeansId: number;
      outWeight: number;
      rating: number;
      timestamp: Date;
    };
  };
}