interface CoffeeBeansBase {
  name: string;
  details: string;
}

export class CoffeeBeans implements CoffeeBeansBase {
  id: number;
  name: string;
  details: string;

  constructor(item: CoffeeBeansBase, id: number) {
    this.name = item.name;
    this.details = item.details;
    this.id = id;
  }

  static fromCoffeeBeansDB(coffeeBeansDB: CoffeeBeansDB) {
    return new CoffeeBeans(coffeeBeansDB, coffeeBeansDB.id);
  }
}

export class CoffeeBeansSubmit implements CoffeeBeansBase {
  name: string;
  details: string;

  private constructor(name: string, description: string) {
    this.name = name;
    this.details = description;
  }

  static create(name: string, description: string): CoffeeBeansSubmit | "ValidationFailed_NameMustBeAtLeast3CharsLong" {
    let _name = name.trim();
    let _description = description.trim();

    if (_name.length < 3) {
      return "ValidationFailed_NameMustBeAtLeast3CharsLong"
    }

    return new CoffeeBeansSubmit(_name, _description);
  }
}

export class CoffeeBeansDBSubmit implements CoffeeBeansBase {
  name: string;
  details: string;
  nameLowerCase: string;

  constructor(item: CoffeeBeansSubmit) {
    this.name = item.name;
    this.details = item.details;
    this.nameLowerCase = item.name.toLowerCase();
  }
}

export interface CoffeeBeansDB extends CoffeeBeansDBSubmit {
  id: number;
}