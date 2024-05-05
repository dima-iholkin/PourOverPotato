export async function load({ url }) {
  const coffeeBeansName = url.searchParams.get("coffee_beans_name");
  return { coffeeBeansName };
}