export interface ImportJSON {
  dbVersion: unknown | number;
  coffeeBeans: unknown | ImportedJsonCoffeeBeans[];
  recipes: unknown | ImportedJsonRecipe[];
}

export interface ImportedJsonCoffeeBeans {
  id: unknown | number;
  name: unknown | string;
  description: unknown | string;
}

export interface ImportedJsonRecipe {
  id: unknown | number;
  coffeeBeansId: unknown | number;
  recipeTarget: unknown | string;
  recipeResult: unknown | string;
  recipeThoughts: unknown | string;
  favorite: unknown | boolean | undefined;
  rating: unknown | number;
  outWeight: unknown | number;
  timestamp: unknown | Date;
}