import { CoffeeBeans, type CoffeeBeansSubmit } from "$lib/domain/entities/CoffeeBeans";

export interface ICoffeeBeansDB {
  id: number;
  name: string;
  description: string;
  nameLowerCase: string;
}

export class CoffeeBeansDB implements ICoffeeBeansDB {
  id: number;
  name: string;
  description: string;
  nameLowerCase: string;

  constructor(item: Omit<ICoffeeBeansDB, "id">, id: number) {
    this.id = id;
    this.name = item.name;
    this.description = item.description;
    this.nameLowerCase = item.nameLowerCase;
  }

  toCoffeeBeans() {
    return new CoffeeBeans(this, this.id);
  }
}

export class CoffeeBeansDBSubmit implements Omit<ICoffeeBeansDB, "id"> {
  name: string;
  description: string;
  nameLowerCase: string;

  constructor(item: CoffeeBeansSubmit) {
    this.name = item.name;
    this.description = item.description;
    this.nameLowerCase = item.name.toLowerCase();
  }
}