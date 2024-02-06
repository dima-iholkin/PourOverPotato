import type { PageLoadEvent } from "./$types";

export function load({ params }: PageLoadEvent) {
  const id: number = Number.parseFloat(params.id);

  if (Number.isInteger(id) === false) {
    throw new Error("Non-integer route params are not allowed for this page. The matcher should have filtered out" +
      "non-integer values. Something is wrong with the code.");
  }

  return {
    recipeId: id
  };
}