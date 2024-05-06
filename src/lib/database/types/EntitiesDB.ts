import type { DBSchema } from "idb";
import type { ICoffeeBeansDB } from "./CoffeeBeansDB";
import type { IRecipeDB } from "./RecipeDB";

export interface EntitiesDB extends DBSchema {
  coffeeBeans: {
    key: number;
    value: ICoffeeBeansDB;
    indexes: {
      nameLowerCase: string;
    };
  };
  recipes: {
    key: number;
    value: IRecipeDB;
    indexes: {
      coffeeBeansId: number;
      outWeight: number;
      rating: number;
      timestamp: number;
    };
  };
}
