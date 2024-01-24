import { getCoffeeBeansByName } from "../../../database/indexedDB";
import type { CoffeeBeans } from "../../../entities/CoffeeBeans";
import type { CoffeeBeansValidationResult } from "./CoffeeBeansValidationResult";

export async function validateAndParseCoffeeBeans(
  coffeeBeansIdStr: string, newCoffeeBeansName: string | undefined
): Promise<CoffeeBeansValidationResult> {
  // Validate new coffee beans creation:

  if (coffeeBeansIdStr === "create_new") {
    if (newCoffeeBeansName === undefined) {
      throw new Error("Couldn't find the new CoffeeBeans name from the form's HTML.")
    }

    if (newCoffeeBeansName.trim() === "") {
      return Promise.resolve({ failureResult: "CoffeeBeansName_CannotBeEmpty" });

    }

    if (newCoffeeBeansName.length < 3) {
      return Promise.resolve({ failureResult: "CoffeeBeansName_TooShort" });
    }

    const presentCoffeeBeans: CoffeeBeans | undefined = await getCoffeeBeansByName(newCoffeeBeansName);
    if (presentCoffeeBeans) {
      return { failureResult: "NewCoffeeBeans_NameCollision" };
    }

    return { newBeansName: newCoffeeBeansName };
  }

  // Validate a present coffee beans selection:

  const coffeeBeansId: number = Number.parseInt(coffeeBeansIdStr);

  if (isNaN(coffeeBeansId)) {
    throw new Error("Couldn't parse the CoffeeBeansId from the form's HTML.");
  }

  return Promise.resolve({ presentBeansId: coffeeBeansId });
}