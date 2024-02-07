import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { RecipeSubmit } from "$lib/domain/entities/Recipe";
import { addCoffeeBeans, addRecipe } from "../indexedDB";
import { devCoffeeBeans } from "./devCoffeeBeans";
import { generateDemoRecipes } from "./devRecipes";

export async function devFillDB() {
  await Promise.all(
    devCoffeeBeans.map(async (item) => {
      const coffeeBeansItem: CoffeeBeans | "Failure_NameAlreadyExist" = await addCoffeeBeans(item);
      if (coffeeBeansItem instanceof CoffeeBeans) {
        const recipes: RecipeSubmit[] = generateDemoRecipes(coffeeBeansItem.id);
        await Promise.all(recipes.map(async (item) => {
          await addRecipe(item);
        }));
      }
    })
  );
}