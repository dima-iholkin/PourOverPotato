import { type DBSchema } from "idb";
import type { Recipe } from "../../entities/Recipe";
import type { CoffeeBeansDBSubmit } from "./CoffeeBeansDB";

export interface EntitiesDB extends DBSchema {
  coffeeBeans: {
    key: number;
    value: CoffeeBeansDBSubmit;
    indexes: { nameLowerCase: string; };
  };
  recipes: {
    key: number;
    value: Recipe;
    indexes: {
      coffeeBeansId: number;
      outputWeight: number;
      rating: number;
      timestamp: Date;
    };
  };
}
