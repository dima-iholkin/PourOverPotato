import { base } from "$app/paths";
import type { RouteId } from "$app/types";

export const routes = {
  home: base + "/",
  coffeeBeansItem: (coffeeBeansName: string) => base + `/coffee_beans/${coffeeBeansName}`,
  recipes: base + "/recipes",
  recipeItem: (recipeId: number) => base + `/recipes/${recipeId}`,
  addRecipe: (coffeeBeansName: string | undefined = undefined) => coffeeBeansName ?
    base + `/recipes/add?coffee_beans_name=${coffeeBeansName}` :
    base + "/recipes/add",
  other: base + "/other"
};

/*
export const routesV2: { [key: string]: RouteId } = {
  home: "/",
  coffeeBeansItem: "/coffee_beans/[name]",
  recipes: "/recipes",
  recipeItem: "/recipes/[id=integer]",
  addRecipe: (coffeeBeansName: string | undefined = undefined) => coffeeBeansName ?
    base + `/recipes/add?coffee_beans_name=${coffeeBeansName}` :
    base + "/recipes/add",
  other: "/other"
}
*/