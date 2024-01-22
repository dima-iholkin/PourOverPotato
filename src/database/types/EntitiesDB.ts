import { type DBSchema } from "idb";

export interface EntitiesDB extends DBSchema {
  coffeeBeans: {
    key: number;
    value: CoffeeBeans;
    indexes: { name: string; };
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
