const rwandaMabanza: CoffeeBeans = {
  id: 1,
  name: "Rwanda Mabanza",
  details: "Washed process. Dark plum, burned cherry notes.",
  recipes: [
    {
      id: 1,
      coffeeBeansId: 1,
      recipeAim: "17g + 270g. 5m boil.",
      recipeOutput: "2m10s + 15s drip.",
      outputWeight: 230,
      rating: 3.5,
      opinion: "Can be better.",
      timestamp: new Date(2023, 12, 20),
    },
    {
      id: 2,
      coffeeBeansId: 1,
      recipeAim: "18g + 290g. 5m boil.",
      recipeOutput: "2m10s + 15s drip.",
      outputWeight: 235,
      rating: 4,
      opinion: "It's better.",
      timestamp: new Date(2023, 12, 23),
    },
    {
      id: 3,
      coffeeBeansId: 1,
      recipeAim: "20g + 300g. 5m boil.",
      recipeOutput: "2m30s + 5s drip.",
      outputWeight: 240,
      rating: 4.5,
      opinion: "It's great.",
      timestamp: new Date(2023, 12, 26),
    }
  ]
};

const colombia: CoffeeBeans = {
  id: 2,
  name: "Colombia",
  details: "Washed process. Berry notes.",
  recipes: [
    {
      id: 4,
      coffeeBeansId: 2,
      recipeAim: "17g + 270g. 5m boil.",
      recipeOutput: "2m10s + 15s drip.",
      outputWeight: 230,
      rating: 3.5,
      opinion: "Can be better.",
      timestamp: new Date(2023, 12, 20),
    },
    {
      id: 5,
      coffeeBeansId: 2,
      recipeAim: "18g + 290g. 5m boil.",
      recipeOutput: "2m10s + 15s drip.",
      outputWeight: 235,
      rating: 4,
      opinion: "It's better.",
      timestamp: new Date(2023, 12, 23),
    },
    {
      id: 6,
      coffeeBeansId: 2,
      recipeAim: "20g + 300g. 5m boil.",
      recipeOutput: "2m30s + 5s drip.",
      outputWeight: 240,
      rating: 4.5,
      opinion: "It's great.",
      timestamp: new Date(2023, 12, 26),
    }
  ]
};

const yirgacheffe: CoffeeBeans = {
  id: 3,
  name: "Yirgacheffe",
  details: "Natural process. Grassy notes.",
  recipes: [
    {
      id: 7,
      coffeeBeansId: 3,
      recipeAim: "17g + 270g. 5m boil.",
      recipeOutput: "2m10s + 15s drip.",
      outputWeight: 230,
      rating: 3.5,
      opinion: "Can be better.",
      timestamp: new Date(2023, 12, 20),
    },
    {
      id: 8,
      coffeeBeansId: 3,
      recipeAim: "18g + 290g. 5m boil.",
      recipeOutput: "2m10s + 15s drip.",
      outputWeight: 235,
      rating: 4,
      opinion: "It's better.",
      timestamp: new Date(2023, 12, 23),
    },
    {
      id: 9,
      coffeeBeansId: 3,
      recipeAim: "20g + 300g. 5m boil.",
      recipeOutput: "2m30s + 5s drip.",
      outputWeight: 240,
      rating: 4.5,
      opinion: "It's great.",
      timestamp: new Date(2023, 12, 26),
    }
  ]
};

export const coffeeBeansToFillDB = [rwandaMabanza, colombia, yirgacheffe];