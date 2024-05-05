import type { CoffeeBeans } from "../entities/CoffeeBeans";

export function sortCoffeeBeansByName(itemA: CoffeeBeans, itemB: CoffeeBeans): number {
  if (itemA.name < itemB.name) {
    return -1;
  }
  if (itemA.name > itemB.name) {
    return 1;
  }
  return 0;
}

export function sortCoffeeBeansByTimestampDesc(
  itemA: CoffeeBeans & { latestRecipeTimestamp: Date | undefined; },
  itemB: CoffeeBeans & { latestRecipeTimestamp: Date | undefined; }
): number {
  if (itemA.latestRecipeTimestamp === undefined) {
    return 1;
  }
  if (itemB.latestRecipeTimestamp === undefined) {
    return -1;
  }
  return itemB.latestRecipeTimestamp.getTime() - itemA.latestRecipeTimestamp.getTime();
}