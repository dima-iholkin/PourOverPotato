<script lang="ts">
  import { onMount } from "svelte";
  import { getAllCoffeeBeans, getRecipesByCoffeeBeansId } from "$lib/database/current/indexedDB";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import {
    sortRecipesByTimestampDesc as byTimestampDescR,
    sortCoffeeBeansByTimestampDesc as byTimestampDescCB
  } from "$lib/domain/helpers/sortRecipes";
  import { routes } from "$lib/domain/routes";
  import CoffeeBeansCard from "$lib/UI/domain-components/cards/CoffeeBeansCard.svelte";
  import AddRecipeFab from "$lib/UI/domain-components/FABs/AddRecipeFab.svelte";
  import Loading from "$lib/UI/domain-components/lists/Loading.svelte";
  import SortedByP from "$lib/UI/domain-components/lists/SortedByP.svelte";
  import AddDemoCoffeeBeans_PageBlock from "$lib/UI/domain-components/page-blocks/AddDemoCoffeeBeans_PageBlock.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import type { EnhancedCoffeeBeans } from "./EnhancedCoffeeBeans";

  // Entities state:

  let coffeeBeans: EnhancedCoffeeBeans[] | undefined;

  // Lifecycle:

  onMount(() => {
    loadAllCoffeeBeans();
  });

  // Helpers:

  async function loadAllCoffeeBeans() {
    const items = await getAllCoffeeBeans();
    const enhancedCoffeeBeansItems: EnhancedCoffeeBeans[] = await Promise.all(
      items.map(async (item) => {
        const recipes: Recipe[] = await getRecipesByCoffeeBeansId(item.id);
        const coffeeBeansItem: EnhancedCoffeeBeans = {
          ...item,
          recipeCount: recipes.length,
          latestRecipeTimestamp: recipes.length > 0 ? recipes.sort(byTimestampDescR)[0].timestamp : undefined
        };
        return coffeeBeansItem;
      })
    );

    coffeeBeans = enhancedCoffeeBeansItems.sort(byTimestampDescCB);
  }
</script>

<svelte:head>
  <title>PourOverPotato app</title>
</svelte:head>

<PageHeadline>Coffee beans</PageHeadline>

{#if coffeeBeans === undefined}
  <Loading />
{:else if coffeeBeans.length === 0}
  <AddDemoCoffeeBeans_PageBlock onAddDemoEntities={() => loadAllCoffeeBeans()} />
{:else}
  <SortedByP>Sorted by latest recipe date</SortedByP>
  {#each coffeeBeans as item (item.id)}
    <CoffeeBeansCard href={routes.coffeeBeansItem(item.name)} {item} recipeCount={item.recipeCount} />
  {/each}
{/if}

<AddRecipeFab href={routes.addRecipe()} />
