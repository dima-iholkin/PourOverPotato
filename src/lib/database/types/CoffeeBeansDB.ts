import { CoffeeBeans, type CoffeeBeansCreateSubmit, type ICoffeeBeans } from "$lib/domain/entities/CoffeeBeans";

export interface ICoffeeBeansDB extends ICoffeeBeans {
  nameLowerCase: string;
  softDeleted: boolean;
}

export class CoffeeBeansDB implements ICoffeeBeansDB {
  id: number;
  name: string;
  nameLowerCase: string;
  description: string;
  softDeleted: boolean;

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
      softDeleted: false
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
  softDeleted: boolean;

  constructor(item: CoffeeBeansCreateSubmit) {
    this.name = item.name;
    this.description = item.description;
    this.nameLowerCase = item.name.toLowerCase();
    this.softDeleted = false;
  }
}