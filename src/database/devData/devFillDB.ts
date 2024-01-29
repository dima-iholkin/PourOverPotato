import { addCoffeeBeans, addRecipe, anyCoffeeBeansSaved, anyRecipesSaved } from "../indexedDB";
import { devCoffeeBeans } from "./devCoffeeBeans";
import { devRecipes } from "./devRecipes";
const { MODE } = import.meta.env;

export async function devFillDB() {
  if (MODE === "development") {
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