import { CoffeeBeansCreateSubmit } from "$lib/domain/entities/CoffeeBeans";

export const DemoCoffeeBeans: CoffeeBeansCreateSubmit[] = [
  CoffeeBeansCreateSubmit.create({
    name: "Rwanda Mabanza",
    description: "Washed process. Dark plum, dark cherry notes. (demo)"
  }) as CoffeeBeansCreateSubmit,
  CoffeeBeansCreateSubmit.create({
    name: "Colombia El Refugio",
    description: "Natural process. Berry notes. (demo)"
  }) as CoffeeBeansCreateSubmit,
  CoffeeBeansCreateSubmit.create({
    name: "Ethiopia Yirgacheffe",
    description: "Washed process. Grassy notes. (demo)"
  }) as CoffeeBeansCreateSubmit
];