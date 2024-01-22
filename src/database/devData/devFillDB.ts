import type { CoffeeBeans } from "../../entities/CoffeeBeans";
import { addCoffeeBeans, addRecipe, anyCoffeeBeansSaved, anyRecipesSaved, createDB } from "../indexedDB";
import { devCoffeeBeans } from "./devCoffeeBeans";
import { devRecipes } from "./devRecipes";
const { MODE } = import.meta.env;

export async function devFillDB() {
  if (MODE === "development") {
    await createDB();

    if (await anyCoffeeBeansSaved() === false) {
      devCoffeeBeans.forEach(async (item) => {
        await addCoffeeBeans(item);
      });
    }

    if (await anyRecipesSaved() === false) {
      devRecipes.forEach(async (item) => {
        await addRecipe(item)
      })
    }
  }
}