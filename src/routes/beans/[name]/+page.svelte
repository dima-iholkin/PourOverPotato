<script lang="ts">
  import { onMount } from "svelte";
  import { error } from "@sveltejs/kit";
  import { Fab } from "konsta/svelte";
  import RecipeCard from "$lib/RecipeCard.svelte";
  import PlusIcon from "$lib/PlusIcon.svelte";
  import type { PageData } from "./$types";
  import { CoffeeBeans } from "../../../entities/CoffeeBeans";
  import type { Recipe } from "../../../entities/Recipe";
  import { getAllCoffeeBeans, getCoffeeBeansByName, getRecipesByCoffeeBeansId } from "../../../database/indexedDB";
  import { sortRecipesByRatingDesc as byRatingDesc } from "../../../database/helpers/sortRecipes";

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

  <Fab
    class="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20"
    text="Add recipe"
    href="/recipes/add?coffee_beans_name={coffeeBeans.name}"
  >
    <svelte:component this={PlusIcon} slot="icon" />
  </Fab>
{:else if coffeeBeans === undefined}
  <p>loading...</p>
{:else if coffeeBeans === "CoffeeBeansNotFound"}
  <h1>404</h1>
  <p>Coffee beans not found.</p>
{/if}
