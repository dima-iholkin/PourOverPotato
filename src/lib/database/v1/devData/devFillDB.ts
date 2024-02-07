import { addCoffeeBeans, addRecipe } from "../indexedDB";
import { devCoffeeBeans } from "./devCoffeeBeans";
import { devRecipes } from "./devRecipes";

export async function devFillDB() {
  await Promise.all(
    devCoffeeBeans.map(async (item) => await addCoffeeBeans(item))
  );

  await Promise.all(
    devRecipes.map(async (item) => await addRecipe(item))
  );
}