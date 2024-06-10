import type { ImportedJsonCoffeeBeans } from "$lib/database/types/ImportJSON";
import { CoffeeBeans, type ICoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
import { isNullOrUndefined } from "$lib/helpers/undefinedHelpers";
import { checkIsValidEntityId, parseTextField } from "./primitives";

export function parseCoffeeBeans(importedItem: unknown | ImportedJsonCoffeeBeans): CoffeeBeans | "ImportFailed" {
  if (isNullOrUndefined(importedItem)) {
    return "ImportFailed";
  }
  // At this point we've proven it has a value:
  const _importedItem = importedItem as ImportedJsonCoffeeBeans;
  // Parse the Id field:
  const isValidId: boolean = checkIsValidEntityId(_importedItem.id);
  if (isValidId === false) {
    return "ImportFailed";
  }
  // At this point we've proven it's a valid Id:
  const _id = _importedItem.id as number;
  // Parse the Name field:
  const _name = parseTextField(_importedItem.name);
  // Validate the Name field according to the domain rules:
  if (CoffeeBeans.hasValidName({ name: _name }) === "ValidationFailed_NameMustBeAtLeast3CharsLong") {
    alert(
      "Imported CoffeeBeans name must be at least 3 characters long. Faulty item:\n"
      + JSON.stringify(_importedItem, null, 2)
    );
    return "ImportFailed";
  }
  // Parse the Description field:
  const _description = parseTextField(_importedItem.description);
  // Prepare an entity with parsed fields:
  const parsedItem: ICoffeeBeans = {
    id: _id,
    name: _name,
    description: _description
  };
  // Prepare the CoffeeBeans item:
  const item = new CoffeeBeans(parsedItem);
  return item;
}

export function parseCoffeeBeansArray(
  importedCoffeeBeansArray: unknown | CoffeeBeans[]
): CoffeeBeans[] | "ImportFailed" {
  // Guard clause:
  if (isNullOrUndefined(importedCoffeeBeansArray) || Array.isArray(importedCoffeeBeansArray) === false) {
    alert("\"coffeeBeans\" array not found in the file.");
    return "ImportFailed";
  }
  // At this point we've proven it's an array of something.
  const _importedCoffeeBeansArray: unknown[] | ImportedJsonCoffeeBeans[] = importedCoffeeBeansArray;
  const parsedCoffeeBeansArray: CoffeeBeans[] = [];
  // Parse the CoffeeBeans items:
  for (const item of _importedCoffeeBeansArray) {
    const _item = parseCoffeeBeans(item);
    // Guard clause:
    if (_item === "ImportFailed") {
      return "ImportFailed";
    }
    parsedCoffeeBeansArray.push(_item);
  };
  return parsedCoffeeBeansArray;
}