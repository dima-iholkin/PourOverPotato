export interface CoffeeBeansValidationResult {
  presentBeansId?: number | undefined;
  newBeansName?: string | undefined;
  failureResult?: undefined | "CoffeeBeansName_CannotBeEmpty" | "CoffeeBeansName_TooShort" |
  "NewCoffeeBeans_NameCollision";
}