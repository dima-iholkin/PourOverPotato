import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import type { Recipe } from "$lib/domain/entities/Recipe";

export function findUniqueCoffeeBeans(
  parsedCoffeeBeans: CoffeeBeans[], dbCoffeeBeans: CoffeeBeans[], coffeeBeansIdMapping: Map<number, number>
): CoffeeBeans[] {
  const uniqueCoffeeBeans: CoffeeBeans[] = [];
  for (const parsedItem of parsedCoffeeBeans) {
    // Match the imported and the DB's CoffeeBeans:
    const dbItem: CoffeeBeans | undefined = dbCoffeeBeans.find(dbItem =>
      dbItem.name.toLowerCase() === parsedItem.name.toLowerCase()
    );
    if (dbItem) {
      // If there is a match, we've found a duplicate.
      // Save the mapping between the parsed CoffeeBeans Id and DB CoffeeBeans Id:
      coffeeBeansIdMapping.set(parsedItem.id, dbItem.id);
    } else {
      // If there isn't a match, we've found a unique item:
      uniqueCoffeeBeans.push(parsedItem);
    }
  }
  return uniqueCoffeeBeans;
}

export function findUniqueRecipes(parsedRecipes: Recipe[], dbRecipes: Recipe[]): Recipe[] {
  const uniqueRecipes: Recipe[] = [];
  for (const parsedItem of parsedRecipes) {
    // Find a match in the DB:
    const dbMatch: Recipe | undefined = dbRecipes.find(dbItem =>
      dbItem.timestamp.getTime() === parsedItem.timestamp.getTime() &&
      dbItem.outWeight === parsedItem.outWeight &&
      dbItem.rating === parsedItem.rating &&
      dbItem.recipeTarget === parsedItem.recipeTarget &&
      dbItem.recipeResult === parsedItem.recipeResult &&
      dbItem.recipeThoughts === parsedItem.recipeThoughts &&
      dbItem.coffeeBeansId === parsedItem.coffeeBeansId &&
      dbItem.favorite === parsedItem.favorite
    );
    if (dbMatch) {
      // If there is a match, we've found a duplicate. Don't add it to the uniques.
    } else {
      // If there isn't a match, we've found a unique item:
      uniqueRecipes.push(parsedItem);
    }
  }
  return uniqueRecipes;
}