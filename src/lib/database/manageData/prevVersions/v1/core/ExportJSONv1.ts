import type { ICoffeeBeans_v1 } from "./CoffeeBeansV1";
import type { IRecipe_v1 } from "./RecipeV1";

export interface ExportJSON_v1 {
  dbVersion: number;
  coffeeBeans: ICoffeeBeans_v1[];
  recipes: IRecipe_v1[];
}