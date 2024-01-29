<script lang="ts">
  import MyFab from "$lib/UI/MyFab.svelte";
  import RecipeCard from "$lib/UI/cards/RecipeCard.svelte";
  import { sortRecipesByRatingDesc as byRatingDesc } from "$lib/database/helpers/sortRecipes";
  import { getCoffeeBeansByName, getRecipesByCoffeeBeansId } from "$lib/database/indexedDB";
  import { CoffeeBeans } from "$lib/entities/CoffeeBeans";
  import type { Recipe } from "$lib/entities/Recipe";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  // Props:

  export let data: PageData;

  // State:

  let coffeeBeans: CoffeeBeans | undefined | "CoffeeBeansNotFound";
  let recipes: Recipe[] | undefined;

  onMount(() => {
    getCoffeeBeansByName(data.coffeeBeansName)
      .then((item: CoffeeBeans | undefined): Promise<Recipe[] | "CoffeeBeansNotFound"> => {
        if (item === undefined) {
          coffeeBeans = "CoffeeBeansNotFound";
          return Promise.resolve("CoffeeBeansNotFound");
        }

        coffeeBeans = item;

        return getRecipesByCoffeeBeansId(coffeeBeans.id);
      })
      .then((items: Recipe[] | "CoffeeBeansNotFound") => {
        if (items === "CoffeeBeansNotFound") {
          return;
        }

        recipes = items.sort(byRatingDesc);
      });
  });
</script>

<svelte:head>
  {#if coffeeBeans instanceof CoffeeBeans}
    <title>{coffeeBeans.name}</title>
  {:else if coffeeBeans === undefined}
    <title>loading...</title>
  {:else if coffeeBeans === "CoffeeBeansNotFound"}
    <title>404 Not Found</title>
  {/if}
</svelte:head>

{#if coffeeBeans instanceof CoffeeBeans}
  <h1>{coffeeBeans.name}</h1>

  {#if recipes !== undefined && recipes.length > 0}
    {#each recipes as recipe}
      <RecipeCard {recipe} />
    {/each}
  {:else if recipes !== undefined && recipes.length === 0}
    <p>No recipes added yet.</p>
  {:else}
    <p>loading...</p>
  {/if}

  <MyFab href="/recipes/add?coffee_beans_name={coffeeBeans.name}" />
{:else if coffeeBeans === undefined}
  <p>loading...</p>
{:else if coffeeBeans === "CoffeeBeansNotFound"}
  <h1>404</h1>
  <p>Coffee beans not found.</p>
{/if}
