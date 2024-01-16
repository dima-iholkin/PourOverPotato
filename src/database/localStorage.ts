import { coffeeBeansToFillDB } from "./fillDbData_DevOnly";

// export function saveData(key: string, value: any) {
//   localStorage.setItem(key, JSON.stringify(value));
// }

export function loadCoffeeBeans(): CoffeeBeansItem[] {
  fillDbIfEmpty_DevOnly();

  const coffeeBeans: CoffeeBeansItem[] = JSON.parse(localStorage.getItem("recipes") ?? "[]");
  return coffeeBeans;
}

function fillDbIfEmpty_DevOnly() {
  let recipes: string | null = localStorage.getItem("recipes");

  if (recipes !== null) {
    return;
  }

  const coffeeBeansSerialized: string = JSON.stringify(coffeeBeansToFillDB);
  localStorage.setItem("recipes", coffeeBeansSerialized);
}