import type { ICoffeeBeans_v5 } from "./CoffeeBeansV5";
import type { IRecipe_v5 } from "./RecipeV5";

export interface ExportJSON_v5 {
  dbVersion: number;
  coffeeBeans: ICoffeeBeans_v5[];
  recipes: IRecipe_v5[];
}