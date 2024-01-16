/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    coffeeBeansName: params.name
  }

  console.log("In load function.");
}