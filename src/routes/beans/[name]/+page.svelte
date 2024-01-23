<script lang="ts">
  import { onMount } from "svelte";
  import { error } from "@sveltejs/kit";
  import { Fab } from "konsta/svelte";
  import RecipeCard from "$lib/RecipeCard.svelte";
  import PlusIcon from "$lib/PlusIcon.svelte";
  import type { PageData } from "./$types";
  import type { CoffeeBeans } from "../../../entities/CoffeeBeans";
  import type { Recipe } from "../../../entities/Recipe";
  import { getAllCoffeeBeans, getCoffeeBeansByName, getRecipesByCoffeeBeansId } from "../../../database/indexedDB";
  import { sortRecipesByRatingDesc as byRatingDesc } from "../../../database/helpers/sortRecipes";

  // Props:

  export let data: PageData;

  // State:

  let coffeeBeans: CoffeeBeans | undefined | "NotFound";
  let recipes: Recipe[] | undefined;

  onMount(() => {
    getCoffeeBeansByName(data.coffeeBeansName)
      .then((item: CoffeeBeans | undefined): Promise<Recipe[] | undefined | "NotFound"> => {
        if (item === undefined) {
          coffeeBeans = "NotFound";
          return Promise.resolve("NotFound");
        }

        coffeeBeans = item;
        return getRecipesByCoffeeBeansId(coffeeBeans.id);
      })
      .then((items: Recipe[] | undefined | "NotFound") => {
        if (items === undefined || items === "NotFound") {
          return;
        }

        recipes = items.sort(byRatingDesc);
      });
  });
</script>

{#if coffeeBeans === undefined}
  <p>waiting...</p>
{:else if coffeeBeans === "NotFound"}
  <h1>404</h1>
  <p>Coffee beans not found.</p>
{:else}
  <h1>{coffeeBeans.name}</h1>

  {#if recipes === undefined}
    <p>No recipes added yet.</p>
  {:else}
    {#each recipes as recipe}
      <RecipeCard {recipe} />
    {/each}
  {/if}

  <Fab
    class="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20"
    text="Create"
    href="/recipes/add?coffee_beans_name={coffeeBeans.name}"
  >
    <svelte:component this={PlusIcon} slot="icon" />
  </Fab>
{/if}
