<script context="module" lang="ts">
  const options: Intl.DateTimeFormatOptions = {
    timeStyle: "short",
    dateStyle: "long"
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { getCoffeeBeansById } from "../../../database/indexedDB";
  import type { CoffeeBeans } from "../../../entities/CoffeeBeans";
  import type { Recipe } from "../../../entities/Recipe";
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
  <div class="card-header">
    <p class="timestamp">{recipe.timestamp.toLocaleString(undefined, options)}</p>
    <p>{recipe.rating}/5</p>
  </div>
  {#if showCoffeeBeans}
    <h5>
      {coffeeBeans ? coffeeBeans.name : "loading..."}
    </h5>
  {/if}
  <p>Recipe target: {recipe.recipeTarget}</p>
  <p>Recipe output: {recipe.recipeOutput}</p>
  <p>Output weight: {recipe.outputWeight}g</p>
  <p>Opinion: {recipe.opinion}</p>
</Card>

<style lang="postcss">
  h5 {
    @apply text-2xl font-bold tracking-tight text-gray-900 dark:text-white;

    margin-bottom: 0.5rem;
  }

  p {
    @apply font-normal text-gray-700 dark:text-gray-400;
  }

  .timestamp {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 10pt;
  }

  .card-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 8px; */
  }

  /* p {
    margin: 8px 0;
  } */
</style>
