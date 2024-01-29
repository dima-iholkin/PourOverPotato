import type { CoffeeBeansDB } from "$lib/entities/CoffeeBeans";
import type { Recipe } from "$lib/entities/Recipe";
import { type DBSchema } from "idb";

export interface EntitiesDB extends DBSchema {
  coffeeBeans: {
    key: number;
    value: CoffeeBeansDB;
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
