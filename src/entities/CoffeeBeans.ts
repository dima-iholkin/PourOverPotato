interface CoffeeBeans {
  id: number;
  name: string;
  details: string;
}

type CoffeeBeansSubmit = Omit<CoffeeBeans, "id">;