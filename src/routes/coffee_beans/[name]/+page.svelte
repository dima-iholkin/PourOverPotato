<script lang="ts">
  import { onMount } from "svelte";
  import { getCoffeeBeansByName, getRecipesByCoffeeBeansId } from "$lib/database/v1/indexedDB";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { sortRecipesByTimestampDesc as byTimestampDesc } from "$lib/domain/helpers/sortRecipes";
  import { routes } from "$lib/domain/routes";
  import RecipeCard from "$lib/UI/cards/RecipeCard.svelte";
  import FlexRow from "$lib/UI/FlexRow.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import MyFab from "$lib/UI/MyFab.svelte";
  import AddDemoCoffeeBeans_PageBlock from "$lib/UI/single-use-components/AddDemoCoffeeBeans_PageBlock.svelte";
  import type { PageData } from "./$types";
  import DropdownMenu from "./DropdownMenu.svelte";
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

        recipes = items.sort(byTimestampDesc);
      });
  });
</script>

<svelte:head>
  {#if coffeeBeans instanceof CoffeeBeans}
    <title>{coffeeBeans.name} - PourOverPotato app</title>
  {:else if coffeeBeans === undefined}
    <title>loading... - PourOverPotato app</title>
  {:else if coffeeBeans === "CoffeeBeansNotFound"}
    <title>404 Not Found - PourOverPotato app</title>
  {/if}
</svelte:head>

{#if coffeeBeans instanceof CoffeeBeans}
  <FlexRow>
    <PageHeadline>{coffeeBeans.name}</PageHeadline>
    <div class="menu-container">
      <EditCoffeeBeansModal coffeeBeansItem={coffeeBeans} />
      <DropdownMenu coffeeBeansItem={coffeeBeans} />
    </div>
  </FlexRow>
  <p class="coffee-beans-description">{coffeeBeans.description}</p>

  {#if recipes !== undefined && recipes.length > 0}
    <h2>Sorted by latest</h2>
    {#each recipes as recipe}
      <RecipeCard href={routes.recipeItem(recipe.id)} {recipe} />
    {/each}
  {:else if recipes !== undefined && recipes.length === 0}
    <AddDemoCoffeeBeans_PageBlock />
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
    margin-bottom: 1rem;
  }

  h2 {
    @apply text-lg font-normal tracking-tight text-gray-900 dark:text-white;

    margin-top: 1rem;
  }

  .menu-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
