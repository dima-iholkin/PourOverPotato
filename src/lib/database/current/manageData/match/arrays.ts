import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { Recipe } from "$lib/domain/entities/Recipe";
import type { IRecipeDB } from "../../types/RecipeDB";

export function matchUniqueCoffeeBeansToAdd(
  parsedCoffeeBeans: CoffeeBeans[], dbCoffeeBeans: CoffeeBeans[], matchCoffeeBeansIds: Map<number, number>
): CoffeeBeans[] {
  const uniqueCoffeeBeans: CoffeeBeans[] = [];
  for (const parsedCoffeeBeansItem of parsedCoffeeBeans) {
    // Match the imported and the DB's CoffeeBeans:
    const matchedDbItem: CoffeeBeans | undefined = dbCoffeeBeans.find(dbItem =>
      dbItem.name.toLowerCase() === parsedCoffeeBeansItem.name.toLowerCase()
    );
    // If there is a match, save the mapping between the imported and DB's CoffeeBeans Id:
    if (matchedDbItem) {
      matchCoffeeBeansIds.set(parsedCoffeeBeansItem.id, matchedDbItem.id);
      continue;
    }
    // If there isn't a match, prepare to add the new CoffeeBeans item:
    else {
      uniqueCoffeeBeans.push(parsedCoffeeBeansItem);
    }
  }
  return uniqueCoffeeBeans;
}

export function matchUniqueRecipesToAdd(parsedRecipes: Recipe[], dbRecipes: IRecipeDB[]): Recipe[] {
  const uniqueRecipesToAdd: Recipe[] = [];
  for (const item of parsedRecipes) {
    // Find a match in the DB:
    const dbMatch: IRecipeDB | undefined = dbRecipes.find(dbItem =>
      dbItem.timestamp === item.timestamp.getTime() &&
      dbItem.outWeight === item.outWeight &&
      dbItem.rating === item.rating &&
      dbItem.recipeTarget === item.recipeTarget &&
      dbItem.recipeResult === item.recipeResult &&
      dbItem.recipeThoughts === item.recipeThoughts &&
      dbItem.coffeeBeansId === item.coffeeBeansId
    );
    // If there is a match, don't add this Recipe to the uniques array:
    if (dbMatch) {
      continue;
    }
    uniqueRecipesToAdd.push(item);
  }
  return uniqueRecipesToAdd;
}