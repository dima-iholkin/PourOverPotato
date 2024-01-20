import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export function load({ params }: PageLoad) {
  return {
    coffeeBeansName: params.name
  }
}