import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { Recipe } from "$lib/domain/entities/Recipe";

export interface ExportJSON {
  dbVersion: number;
  coffeeBeans: CoffeeBeans[];
  recipes: Recipe[];
}