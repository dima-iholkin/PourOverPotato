import type { ICoffeeBeans_v4 } from "./CoffeeBeansV4";
import type { IRecipe_v4 } from "./RecipeV4";

export interface ExportJSON_v4 {
  dbVersion: number;
  coffeeBeans: ICoffeeBeans_v4[];
  recipes: IRecipe_v4[];
}