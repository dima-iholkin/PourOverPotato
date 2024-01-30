export const routes = {
  home: "/",
  coffeeBeansItem: (coffeeBeansName: string) => `/coffee_beans/${coffeeBeansName}`,
  recipes: "/recipes",
  addRecipe: (coffeeBeansName: string | undefined) => coffeeBeansName ?
  `/recipes/add?coffee_beans_name=${coffeeBeansName}` :
  "/recipes/add",
  other: "/other",
}