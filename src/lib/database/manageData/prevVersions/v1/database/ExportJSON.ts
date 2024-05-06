import type { ICoffeeBeans_v1 } from "$lib/database/manageData/prevVersions/v1/core/CoffeeBeans";
import type { IRecipe_v1 } from "$lib/database/manageData/prevVersions/v1/core/Recipe";

export interface ExportJSON_v1 {
  dbVersion: number;
  coffeeBeans: ICoffeeBeans_v1[];
  recipes: IRecipe_v1[];
}