interface CoffeeBeansBase {
  name: string;
  description: string;
}

export class CoffeeBeans implements CoffeeBeansBase {
  id: number;
  name: string;
  description: string;

  constructor(item: CoffeeBeansBase, id: number) {
    this.name = item.name;
    this.description = item.description;
    this.id = id;
  }

  static fromCoffeeBeansDB(coffeeBeansDB: CoffeeBeansDB) {
    return new CoffeeBeans(coffeeBeansDB, coffeeBeansDB.id);
  }
}

export class CoffeeBeansSubmit implements CoffeeBeansBase {
  name: string;
  description: string;

  private constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
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
  description: string;
  nameLowerCase: string;

  constructor(item: CoffeeBeansSubmit) {
    this.name = item.name;
    this.description = item.description;
    this.nameLowerCase = item.name.toLowerCase();
  }
}

export interface CoffeeBeansDB extends CoffeeBeansDBSubmit {
  id: number;
}