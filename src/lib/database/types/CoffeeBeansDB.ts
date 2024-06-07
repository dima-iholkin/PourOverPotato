import { CoffeeBeans, type CoffeeBeansCreateSubmit, type ICoffeeBeans } from "$lib/domain/entities/CoffeeBeans";

export interface ICoffeeBeansDB extends ICoffeeBeans {
  nameLowerCase: string;
  softDeleted: 0 | 1;
}

export class CoffeeBeansDB implements ICoffeeBeansDB {
  id: number;
  name: string;
  nameLowerCase: string;
  description: string;
  softDeleted: 0 | 1;

  constructor(item: ICoffeeBeansDB) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.nameLowerCase = item.nameLowerCase;
    this.softDeleted = item.softDeleted;
  }

  static fromCoffeeBeans(item: ICoffeeBeans): CoffeeBeansDB {
    const obj: ICoffeeBeansDB = {
      ...item,
      nameLowerCase: item.name.toLowerCase(),
      softDeleted: 0
    };
    return new CoffeeBeansDB(obj);
  }

  toCoffeeBeans(): CoffeeBeans {
    return new CoffeeBeans(this);
  }
}

export class CoffeeBeansDBSubmit implements Omit<ICoffeeBeansDB, "id"> {
  name: string;
  nameLowerCase: string;
  description: string;
  softDeleted: 0 | 1;

  constructor(item: CoffeeBeansCreateSubmit) {
    this.name = item.name;
    this.description = item.description;
    this.nameLowerCase = item.name.toLowerCase();
    this.softDeleted = 0;
  }
}