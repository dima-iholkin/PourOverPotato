import type { ICoffeeBeans_v1 } from "../core/CoffeeBeans";
import type { IRecipe_v1 } from "../core/Recipe";

export interface ExportJSON_v1 {
  dbVersion: number;
  coffeeBeans: ICoffeeBeans_v1[];
  recipes: IRecipe_v1[];
}