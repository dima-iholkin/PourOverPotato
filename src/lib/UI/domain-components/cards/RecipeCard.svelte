<script context="module" lang="ts">
  const options: Intl.DateTimeFormatOptions = {
    timeStyle: "short",
    dateStyle: "long"
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { getCoffeeBeansById } from "$lib/database/v1/indexedDB";
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { naming } from "$lib/domain/naming";
  import Card from "$lib/UI/utility-components/Card.svelte";
  import FlexRow from "$lib/UI/utility-components/FlexRow.svelte";

  // Props:

  export let recipe: Recipe;

  export let showCoffeeBeansName: boolean = false;

  export let href: string | undefined;

  // State:

  let coffeeBeans: CoffeeBeans | undefined;

  // Lifecycle hooks:

  onMount(() => {
    if (showCoffeeBeansName === true) {
      getCoffeeBeansById(recipe.coffeeBeansId).then((item) => {
        coffeeBeans = item;
      });
    }
  });
</script>

<Card {href}>
  <FlexRow>
    <p class="timestamp">{recipe.timestamp.toLocaleString(undefined, options)}</p>
    <p>{recipe.rating}⭐</p>
  </FlexRow>
  {#if showCoffeeBeansName}
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
