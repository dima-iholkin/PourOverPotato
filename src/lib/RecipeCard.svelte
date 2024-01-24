<script context="module" lang="ts">
  const options: Intl.DateTimeFormatOptions = {
    timeStyle: "short",
    dateStyle: "long"
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { Recipe } from "../entities/Recipe";
  import { getCoffeeBeansById } from "../database/indexedDB";
  import type { CoffeeBeans } from "../entities/CoffeeBeans";

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

<div class="container">
  {#if showCoffeeBeans}
    <h1>
      {#if coffeeBeans === undefined}
        waiting...
      {:else}
        {coffeeBeans.name}
      {/if}
    </h1>
  {/if}
  <p class="timestamp">{recipe.timestamp.toLocaleString(undefined, options)}</p>
  <p>Recipe target: {recipe.recipeTarget}</p>
  <p>Recipe output: {recipe.recipeOutput}</p>
  <p>Output weight: {recipe.outputWeight}g</p>
  <p>Rating: {recipe.rating}</p>
  <p>Opinion: {recipe.opinion}</p>
</div>

<style>
  .container {
    margin: 16px 0;
    border: solid #eeeeee;
  }

  .timestamp {
    font-family: "Courier New", Courier, monospace;
  }

  h1,
  p {
    margin: 8px 0;
  }
</style>
