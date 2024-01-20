import { error } from "@sveltejs/kit";

// export function load({ params }: PageLoad) {
//   return {
//     coffeeBeansName: params.name
//   }
// }

export async function load({ url }) {
  let coffeeBeansName = url.searchParams.get('coffee_beans_name');
  return { coffeeBeansName };
}