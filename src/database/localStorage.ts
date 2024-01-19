import { coffeeBeansToFillDB } from "./fillDbData_DevOnly";
const { MODE } = import.meta.env;

let coffeeBeans: CoffeeBeansItem[] | undefined;

export function loadCoffeeBeans(): CoffeeBeansItem[] {
  if (MODE === "development") {
    fillDbIfEmpty_DevOnly();
  }

  if (coffeeBeans === undefined) {
    let rawRecipes: string = localStorage.getItem("recipes") ?? "[]";
    coffeeBeans = JSON.parse(rawRecipes);

    coffeeBeans!.forEach(
      item => item.recipes.forEach(
        recipe => recipe.dateTime = new Date(recipe.dateTime as unknown as string)
      )
    )
  }

  return coffeeBeans!;
}

function fillDbIfEmpty_DevOnly() {
  let recipes: string | null = localStorage.getItem("recipes");

  if (recipes !== null) {
    return;
  }

  const coffeeBeansSerialized: string = JSON.stringify(coffeeBeansToFillDB);
  localStorage.setItem("recipes", coffeeBeansSerialized);
}