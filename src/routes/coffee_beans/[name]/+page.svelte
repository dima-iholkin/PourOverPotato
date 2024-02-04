<script lang="ts">
  import FlexRow from "$lib/UI/FlexRow.svelte";
  import MyFab from "$lib/UI/MyFab.svelte";
  import RecipeCard from "$lib/UI/cards/RecipeCard.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import { getCoffeeBeansByName, getRecipesByCoffeeBeansId } from "$lib/database/v1/indexedDB";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { sortRecipesByRatingDesc as byRatingDesc } from "$lib/domain/helpers/sortRecipes";
  import { routes } from "$lib/domain/routes";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import EditCoffeeBeansModal from "./EditCoffeeBeansModal.svelte";

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
  <FlexRow>
    <PageHeadline>{coffeeBeans.name}</PageHeadline>
    <EditCoffeeBeansModal coffeeBeansItem={coffeeBeans} />
  </FlexRow>
  <p class="coffee-beans-description">{coffeeBeans.description}</p>

  {#if recipes !== undefined && recipes.length > 0}
    <h2>Best recipes</h2>
    {#each recipes as recipe}
      <RecipeCard {recipe} />
    {/each}
  {:else if recipes !== undefined && recipes.length === 0}
    <p>No recipes added yet.</p>
  {:else}
    <p>loading...</p>
  {/if}

  <MyFab href={routes.addRecipe(coffeeBeans.name)} />
{:else if coffeeBeans === undefined}
  <p>loading...</p>
{:else if coffeeBeans === "CoffeeBeansNotFound"}
  <h1>404</h1>
  <p>Coffee beans not found.</p>
{/if}

<style lang="postcss">
  .coffee-beans-description {
    margin-top: 0.25rem;
  }

  h2 {
    @apply text-xl font-normal tracking-tight text-gray-900 dark:text-white;

    margin-top: 1rem;
  }
</style>
