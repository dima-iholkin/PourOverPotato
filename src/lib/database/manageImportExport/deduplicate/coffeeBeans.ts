import { CoffeeBeansDB } from "$lib/database/types/CoffeeBeansDB";
import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import { addToast } from "$lib/UI/genericComponents/toasts/toastProvider";

export function deduplicateCoffeeBeans(itemsImported: CoffeeBeans[], itemsDB: CoffeeBeans[]): CoffeeBeans[] {
  const coffeeBeansImported: CoffeeBeansDB[] = itemsImported.map((item => CoffeeBeansDB.fromCoffeeBeans(item)));
  const coffeeBeansDB: CoffeeBeansDB[] = itemsDB.map((item => CoffeeBeansDB.fromCoffeeBeans(item)));
  const findDuplicates: Map<string, number> = new Map<string, number>();
  coffeeBeansImported.forEach((item) => {
    const mapValue: number | undefined = findDuplicates.get(item.nameLowerCase);
    if (mapValue === undefined) {
      findDuplicates.set(item.nameLowerCase, 1);
    } else {
      findDuplicates.set(item.nameLowerCase, mapValue + 1);
    }
  });
  for (const [key, value] of findDuplicates) {
    // Guard clause:
    if (value < 2) {
      continue;
    }
    // Find the greatestNum between the imported array items:
    const greatestNumImported: number | undefined = coffeeBeansImported
      .filter(itemCB => itemCB.nameLowerCase.startsWith(key + "-"))
      .map(itemCB => itemCB.nameLowerCase.slice(key.length + 1))
      .map(str => Number(str))
      .filter(num => Number.isInteger(num))
      .sort().at(-1); // Sort ascending and get the greatest item.
    // Find the greatestNum between the DB array items:
    const greatestNumDB: number | undefined = coffeeBeansDB
      .filter(itemCB => itemCB.nameLowerCase.startsWith(key + "-"))
      .map(itemCB => itemCB.nameLowerCase.slice(key.length + 1))
      .map(str => Number(str))
      .filter(num => Number.isInteger(num))
      .sort().at(-1); // Sort ascending and get the greatest item.
    // Find the actual greatest number:
    let greatestNum: number;
    if (
      (greatestNumImported === undefined || isNaN(greatestNumImported))
      && (greatestNumDB === undefined || isNaN(greatestNumDB))
    ) {
      addToast("Something went wrong with coffee beans deduplication during import. Please contact the developer.");
      throw new Error("Something went wrong with greatestNum value.");
    } else if (greatestNumImported === undefined || isNaN(greatestNumImported)) {
      greatestNum = greatestNumDB!;
    } else if (greatestNumDB === undefined || isNaN(greatestNumDB)) {
      greatestNum = greatestNumImported;
    } else {
      greatestNum = Math.max(greatestNumImported, greatestNumDB);
    }
    // Rename the duplicate items:
    const duplicateItems: CoffeeBeansDB[] = coffeeBeansImported.filter(item => item.nameLowerCase === key);
    for (const item of duplicateItems) {
      greatestNum++;
      const newName: string = item.name + "-" + greatestNum;
      // Prepare and save the changed CoffeeBeans item:
      const submitItem: CoffeeBeansDB = new CoffeeBeansDB({
        ...item,
        name: newName,
        nameLowerCase: newName.toLowerCase(),
        softDeletionTimestamp: undefined
      });
      const index: number = itemsImported.findIndex(cb => cb.id === item.id);
      itemsImported[index] = submitItem.toCoffeeBeans();
    }
  }
  // Show a toast if there were duplicates, but only once:
  let toastShown: boolean = false;
  findDuplicates.forEach((value) => {
    if (value >= 2 && toastShown === false) {
      toastShown = true;
      addToast("Imported file contained coffee beans with duplicate names, they were renamed during import.");
    }
  });
  return itemsImported;
}