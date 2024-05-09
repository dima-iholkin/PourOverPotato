import type { PageLoadEvent } from "./$types";

export function load({ params }: PageLoadEvent) {
  // Parse the Recipe's Id:
  const id: number = Number.parseFloat(params.id);
  // Guard clause:
  if (Number.isInteger(id) === false) {
    throw new Error("Non-integer route params are not allowed for this page. The matcher should have filtered out" +
      "non-integer values. Something is wrong with the code.");
  }
  // The happy path:
  return { recipeId: id };
}