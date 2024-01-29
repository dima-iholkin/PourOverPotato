export async function load({ url }) {
  let coffeeBeansName = url.searchParams.get('coffee_beans_name');

  return { coffeeBeansName };
}