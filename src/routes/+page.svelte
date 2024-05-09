<script lang="ts">
  import { onMount } from "svelte";
  import { getAllCoffeeBeans } from "$lib/database/manageCoffeeBeans";
  import { getRecipesByCoffeeBeansId } from "$lib/database/manageRecipes";
  import { routes } from "$lib/domain/constants/routes";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { sortCoffeeBeansByName } from "$lib/domain/helpers/sortCoffeeBeans";
  import { sortRecipesByTimestampDesc } from "$lib/domain/helpers/sortRecipes";
  import type { EnhancedCoffeeBeans } from "$lib/types/EnhancedCoffeeBeans";
  import CoffeeBeansCard from "$lib/UI/domainComponents/cards/CoffeeBeansCard.svelte";
  import AddRecipeFab from "$lib/UI/domainComponents/FABs/AddRecipeFab.svelte";
  import Loading from "$lib/UI/domainComponents/lists/Loading.svelte";
  // eslint-disable-next-line max-len
  import type { CoffeeBeansSortOrderEnum } from "$lib/UI/domainComponents/lists/SortCoffeeBeansSelect/CoffeeBeansSortOrderEnum";
  import SortCoffeeBeansSelect from "$lib/UI/domainComponents/lists/SortCoffeeBeansSelect/SortCoffeeBeansSelect.svelte";
  import AddDemoCoffeeBeans_PageBlock from "$lib/UI/domainComponents/pageBlocks/AddDemoCoffeeBeans_PageBlock.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";

  // Entities state:
  let coffeeBeans: EnhancedCoffeeBeans[] | undefined;

  // Sorting state:
  let sortOrderValue: {
    value: CoffeeBeansSortOrderEnum;
    sortOrderFunc: (itemA: EnhancedCoffeeBeans, itemB: EnhancedCoffeeBeans) => number;
  };

  // Lifecycle:
  onMount(() => {
    loadAllCoffeeBeans();
  });

  // Sorting reactivity:
  $: {
    if (coffeeBeans) {
      coffeeBeans = coffeeBeans.sort(sortOrderValue?.sortOrderFunc ?? sortCoffeeBeansByName);
    }
  }

  // Helper:
  async function loadAllCoffeeBeans() {
    const items = await getAllCoffeeBeans();
    const enhancedCoffeeBeansItems: EnhancedCoffeeBeans[] = await Promise.all(
      items.map(async (item) => {
        const recipes: Recipe[] = await getRecipesByCoffeeBeansId(item.id);
        const recipesByTimestampLatest = recipes.sort(sortRecipesByTimestampDesc);
        const recipesLength: number = recipes.length;
        const coffeeBeansItem: EnhancedCoffeeBeans = {
          ...item,
          recipeCount: recipesLength,
          latestRecipeTimestamp: recipesLength > 0 ? recipesByTimestampLatest[0].timestamp : undefined,
          earliestRecipeTimestamp: recipesLength > 0 ? recipesByTimestampLatest[recipesLength - 1].timestamp : undefined
        };
        return coffeeBeansItem;
      })
    );
    coffeeBeans = enhancedCoffeeBeansItems.sort(sortCoffeeBeansByName);
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
  <SortCoffeeBeansSelect bind:sortOrderValue />
  {#each coffeeBeans as item (item.id)}
    <CoffeeBeansCard href={routes.coffeeBeansItem(item.name)} {item} recipeCount={item.recipeCount} />
  {/each}
{/if}
<AddRecipeFab href={routes.addRecipe()} />
