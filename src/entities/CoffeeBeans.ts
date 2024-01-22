export interface CoffeeBeans {
  id: number;
  name: string;
  details: string;
}

export type CoffeeBeansSubmit = Omit<CoffeeBeans, "id">;