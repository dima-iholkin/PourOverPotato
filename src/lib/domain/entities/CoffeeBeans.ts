export class CoffeeBeans {
  id: number;
  name: string;
  description: string;

  constructor(item: Omit<CoffeeBeans, "id">, id: number) {
    this.id = id;
    this.name = item.name;
    this.description = item.description;
  }
}

export class CoffeeBeansCreateSubmit implements Omit<CoffeeBeans, "id"> {
  name: string;
  description: string;

  private constructor(item: Omit<CoffeeBeans, "id">) {
    this.name = item.name;
    this.description = item.description;
  }

  // eslint-disable-next-line max-len
  static create(item: Omit<CoffeeBeans, "id">): CoffeeBeansCreateSubmit | "ValidationFailed_NameMustBeAtLeast3CharsLong" {
    const _name = item.name.trim();
    const _description = item.description.trim();

    if (_name.length < 3) {
      return "ValidationFailed_NameMustBeAtLeast3CharsLong";
    }

    const obj: Omit<CoffeeBeans, "id"> = {
      name: _name,
      description: _description
    };

    return new CoffeeBeansCreateSubmit(obj);
  }
}

export class CoffeeBeansEditSubmit implements CoffeeBeans {
  id: number;
  name: string;
  description: string;

  private constructor(item: CoffeeBeans) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
  }

  static create(item: CoffeeBeans): CoffeeBeansEditSubmit | "ValidationFailed_NameMustBeAtLeast3CharsLong" {
    const _name = item.name.trim();
    const _description = item.description.trim();

    if (_name.length < 3) {
      return "ValidationFailed_NameMustBeAtLeast3CharsLong";
    }

    const obj: CoffeeBeans = {
      id: item.id,
      name: _name,
      description: _description
    };

    return new CoffeeBeansEditSubmit(obj);
  }
}