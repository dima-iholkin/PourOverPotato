import { CoffeeBeans, type CoffeeBeansCreateSubmit, type ICoffeeBeans } from "$lib/domain/entities/CoffeeBeans";

export interface ICoffeeBeansDB extends ICoffeeBeans {
  nameLowerCase: string;
  softDeletionTimestamp: number | undefined;
}

export class CoffeeBeansDB implements ICoffeeBeansDB {
  id: number;
  name: string;
  nameLowerCase: string;
  description: string;
  softDeletionTimestamp: number | undefined;

  constructor(item: ICoffeeBeansDB) {
    this.id = item.id;
    this.name = item.name;
    this.nameLowerCase = item.nameLowerCase;
    this.description = item.description;
    this.softDeletionTimestamp = item.softDeletionTimestamp;
  }

  static fromCoffeeBeans(item: ICoffeeBeans): CoffeeBeansDB {
    const obj: ICoffeeBeansDB = {
      ...item,
      nameLowerCase: item.name.toLowerCase(),
      softDeletionTimestamp: undefined
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
  softDeletionTimestamp: number | undefined;

  constructor(item: CoffeeBeansCreateSubmit) {
    this.name = item.name;
    this.nameLowerCase = item.name.toLowerCase();
    this.description = item.description;
    this.softDeletionTimestamp = undefined;
  }
}