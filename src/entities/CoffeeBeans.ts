export class CoffeeBeans {
  id: number;
  name: string;
  details: string;

  constructor(item: CoffeeBeansSubmit, id: number) {
    this.name = item.name;
    this.details = item.details;
    this.id = id;
  }
}

export type CoffeeBeansSubmit = Omit<CoffeeBeans, "id">;

export class CoffeeBeansDBSubmit implements CoffeeBeansSubmit {
  name: string;
  details: string;
  nameLowerCase: string;

  constructor(item: CoffeeBeansSubmit) {
    this.name = item.name;
    this.details = item.details;
    this.nameLowerCase = item.name.toLowerCase();
  }
}