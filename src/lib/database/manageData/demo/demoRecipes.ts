import { RecipeSubmit } from "$lib/domain/entities/Recipe";

export function generateDemoRecipesForCoffeeBeansId(coffeeBeansId: number): RecipeSubmit[] {
  return [
    new RecipeSubmit({
      coffeeBeansId: coffeeBeansId,
      roastDate: undefined,
      bagNumber: "",
      recipeTarget: "17g + 270g. 5m boil.",
      recipeResult: "2m10s + 15s drip.",
      outWeight: 230,
      favorite: false,
      rating: 3.5,
      recipeThoughts: "Can be better.",
      timestamp: new Date(2023, 12, 20)
    }),
    new RecipeSubmit({
      coffeeBeansId: coffeeBeansId,
      roastDate: undefined,
      bagNumber: "",
      recipeTarget: "18g + 290g. 5m boil.",
      recipeResult: "2m10s + 15s drip.",
      outWeight: 235,
      favorite: false,
      rating: 4,
      recipeThoughts: "It's better.",
      timestamp: new Date(2023, 12, 23)
    }),
    new RecipeSubmit({
      coffeeBeansId: coffeeBeansId,
      roastDate: undefined,
      bagNumber: "",
      recipeTarget: "20g + 300g. 5m boil.",
      recipeResult: "2m30s + 5s drip.",
      outWeight: 240,
      favorite: true,
      rating: 4.5,
      recipeThoughts: "It's great.",
      timestamp: new Date(2023, 12, 26)
    })
  ];
}