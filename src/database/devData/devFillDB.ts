const { MODE } = import.meta.env;

export function loadCoffeeBeans(): CoffeeBeans[] {
  if (MODE === "development") {
    fillDbIfEmpty_DevOnly();
  }
}