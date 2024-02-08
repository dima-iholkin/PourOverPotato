<script lang="ts">
  import { onMount } from "svelte";
  import { getAllCoffeeBeans, getRecipesByCoffeeBeansId } from "$lib/database/v1/indexedDB";
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { sortRecipesByTimestampDesc, sortCoffeeBeansByTimestampDesc } from "$lib/domain/helpers/sortRecipes";
  import { routes } from "$lib/domain/routes";
  import CoffeeBeansCard from "$lib/UI/cards/CoffeeBeansCard.svelte";
  import AddDemoCoffeeBeans_PageBlock from "$lib/UI/domain-components/AddDemoCoffeeBeans_PageBlock.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import MyFab from "$lib/UI/MyFab.svelte";

  // State:

  let coffeeBeans: (CoffeeBeans & { recipeCount: number; latestRecipeTimestamp: Date | undefined })[] | undefined;

  // Lifecycle hooks:

  onMount(() => {
    getAllCoffeeBeans().then((items) => {
      Promise.all(
        items.map(async (item) => {
          const recipes: Recipe[] = await getRecipesByCoffeeBeansId(item.id);
          const coffeeBeansItem: CoffeeBeans & { recipeCount: number; latestRecipeTimestamp: Date | undefined } = {
            ...item,
            recipeCount: recipes.length,
            latestRecipeTimestamp:
              recipes.length > 0 ? recipes.sort(sortRecipesByTimestampDesc)[0].timestamp : undefined
          };
          return coffeeBeansItem;
        })
      ).then((items: (CoffeeBeans & { recipeCount: number; latestRecipeTimestamp: Date | undefined })[]) => {
        coffeeBeans = items.sort(sortCoffeeBeansByTimestampDesc);
      });
    });
  });
</script>

<svelte:head>
  <title>PourOverPotato app</title>
</svelte:head>

<PageHeadline>Coffee beans</PageHeadline>

{#if coffeeBeans === undefined}
  <p>loading...</p>
{:else if coffeeBeans.length === 0}
  <AddDemoCoffeeBeans_PageBlock />
{:else}
  <h2>Sorted by latest recipe date</h2>
  {#each coffeeBeans as item (item.id)}
    <CoffeeBeansCard href={routes.coffeeBeansItem(item.name)} {item} recipeCount={item.recipeCount} />
  {/each}
{/if}

<MyFab href={routes.addRecipe()} />

<style lang="postcss">
  h2 {
    @apply text-lg font-normal tracking-tight text-gray-900 dark:text-white;

    margin-top: 1rem;
  }
</style>
