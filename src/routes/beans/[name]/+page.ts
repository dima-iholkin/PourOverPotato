import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export function load({ params }) {
  return {
    coffeeBeansName: params.name
  }
}