<script context="module" lang="ts">
  const options: Intl.DateTimeFormatOptions = {
    timeStyle: "short",
    dateStyle: "long"
  };
</script>

<script lang="ts">
  import FlexRow from "$lib/UI/FlexRow.svelte";
  import { getCoffeeBeansById } from "$lib/database/v1/indexedDB";
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { naming } from "$lib/domain/naming";
  import { onMount } from "svelte";
  import Card from "./Card.svelte";

  // Props:

  export let recipe: Recipe;

  export let showCoffeeBeans: boolean = false;

  // State:

  let coffeeBeans: CoffeeBeans | undefined;

  // Lifecycle hooks:

  onMount(() => {
    if (showCoffeeBeans === true) {
      getCoffeeBeansById(recipe.coffeeBeansId).then((item) => {
        coffeeBeans = item;
      });
    }
  });
</script>

<Card>
  <FlexRow>
    <p class="timestamp">{recipe.timestamp.toLocaleString(undefined, options)}</p>
    <p>{recipe.rating}/5</p>
  </FlexRow>
  {#if showCoffeeBeans}
    <h5>
      {coffeeBeans ? coffeeBeans.name : "loading..."}
    </h5>
  {/if}
  <div>
    <p class="text-gray-400 inline">{naming.recipe.recipeTarget}:</p>
    <p class="inline">{recipe.recipeTarget}</p>
  </div>
  <div>
    <p class="text-gray-400 inline">{naming.recipe.recipeResult}:</p>
    <p class="inline">{recipe.recipeResult}</p>
  </div>
  <div>
    <p class="text-gray-400 inline">{naming.recipe.outWeight}:</p>
    <p class="inline">{recipe.outWeight}g</p>
  </div>
  <div>
    <p class="text-gray-400 inline">{naming.recipe.recipeThoughts}:</p>
    <p class="inline">{recipe.recipeThoughts}</p>
  </div>
</Card>

<style lang="postcss">
  h5 {
    @apply text-2xl font-bold tracking-tight text-gray-900 dark:text-white;

    margin-bottom: 0.5rem;
  }

  p {
    @apply font-normal dark:text-gray-400;
  }

  .timestamp {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 10pt;
  }
</style>
