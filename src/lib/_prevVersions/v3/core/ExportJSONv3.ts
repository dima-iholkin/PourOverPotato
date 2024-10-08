import type { ICoffeeBeans_v3 } from "./CoffeeBeansV3";
import type { IRecipe_v3 } from "./RecipeV3";

export interface ExportJSON_v3 {
  dbVersion: number;
  coffeeBeans: ICoffeeBeans_v3[];
  recipes: IRecipe_v3[];
}