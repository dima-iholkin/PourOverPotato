import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export function load({ params }: PageLoad) {
  // error(404, {
  //   message: "Not found"
  // });

  return {
    coffeeBeansName: params.name
  }
}