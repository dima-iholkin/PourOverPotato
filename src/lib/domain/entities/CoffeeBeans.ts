export interface ICoffeeBeans {
  id: number;
  name: string;
  description: string;
}

export class CoffeeBeans implements ICoffeeBeans {
  id: number;
  name: string;
  description: string;

  constructor(item: ICoffeeBeans) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
  }
}

export class CoffeeBeansCreateSubmit implements Omit<ICoffeeBeans, "id"> {
  name: string;
  description: string;

  private constructor(item: Omit<ICoffeeBeans, "id">) {
    this.name = item.name;
    this.description = item.description;
  }

  // eslint-disable-next-line max-len
  static create(item: Omit<ICoffeeBeans, "id">): CoffeeBeansCreateSubmit | "ValidationFailed_NameMustBeAtLeast3CharsLong" {
    // Prepare the entity:
    const _name = item.name.trim();
    const _description = item.description.trim();
    // Guard clause:
    if (_name.length < 3) {
      return "ValidationFailed_NameMustBeAtLeast3CharsLong";
    }
    // Prepare the entity:
    const obj: Omit<ICoffeeBeans, "id"> = {
      name: _name,
      description: _description
    };
    // Result:
    return new CoffeeBeansCreateSubmit(obj);
  }
}

export class CoffeeBeansEditSubmit implements ICoffeeBeans {
  id: number;
  name: string;
  description: string;

  private constructor(item: ICoffeeBeans) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
  }

  static create(item: ICoffeeBeans): CoffeeBeansEditSubmit | "ValidationFailed_NameMustBeAtLeast3CharsLong" {
    // Prepare the entity:
    const _name = item.name.trim();
    const _description = item.description.trim();
    // Guard clause:
    if (_name.length < 3) {
      return "ValidationFailed_NameMustBeAtLeast3CharsLong";
    }
    // Prepare the entity:
    const obj: CoffeeBeans = {
      id: item.id,
      name: _name,
      description: _description
    };
    // Result:
    return new CoffeeBeansEditSubmit(obj);
  }
}