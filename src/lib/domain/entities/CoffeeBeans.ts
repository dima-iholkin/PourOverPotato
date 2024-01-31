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

export class CoffeeBeansSubmit implements Omit<CoffeeBeans, "id"> {
  name: string;
  description: string;

  private constructor(item: Omit<CoffeeBeans, "id">) {
    this.name = item.name;
    this.description = item.description;
  }

  static create(item: Omit<CoffeeBeans, "id">): CoffeeBeansSubmit | "ValidationFailed_NameMustBeAtLeast3CharsLong" {
    let _name = item.name.trim();
    let _description = item.description.trim();

    if (_name.length < 3) {
      return "ValidationFailed_NameMustBeAtLeast3CharsLong"
    }

    const obj: Omit<CoffeeBeans, "id"> = {
      name: _name,
      description: _description
    };

    return new CoffeeBeansSubmit(obj);
  }
}