import type { ICoffeeBeans_v2 } from "./CoffeeBeansV2";
import type { IRecipe_v2 } from "./RecipeV2";

export interface ExportJSON_v2 {
  dbVersion: number;
  coffeeBeans: ICoffeeBeans_v2[];
  recipes: IRecipe_v2[];
}