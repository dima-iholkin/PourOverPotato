<script lang="ts">
  import { onMount } from "svelte";
  import { getAllEnhancedCoffeeBeans } from "$lib/database/manageEnhancedCoffeeBeans";
  import { routes } from "$lib/domain/constants/routes";
  import { sortCoffeeBeansByName } from "$lib/domain/helpers/sortCoffeeBeans";
  import type { _EnhancedCoffeeBeans } from "$lib/types/EnhancedCoffeeBeans";
  import CoffeeBeansCard from "$lib/UI/domainComponents/cards/CoffeeBeansCard.svelte";
  import AddRecipeFab from "$lib/UI/domainComponents/FABs/AddRecipeFab.svelte";
  import Loading from "$lib/UI/domainComponents/lists/Loading.svelte";
  // eslint-disable-next-line max-len
  import type { CoffeeBeansSortOrderEnum } from "$lib/UI/domainComponents/lists/SortCoffeeBeansSelect/CoffeeBeansSortOrderEnum";
  import SortCoffeeBeansSelect from "$lib/UI/domainComponents/lists/SortCoffeeBeansSelect/SortCoffeeBeansSelect.svelte";
  import AddDemoCoffeeBeans_PageBlock from "$lib/UI/domainComponents/pageBlocks/AddDemoCoffeeBeans_PageBlock.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";

  // Entities state:
  let coffeeBeans: _EnhancedCoffeeBeans[] | undefined;

  // Sorting state:
  let sortOrderValue: {
    value: CoffeeBeansSortOrderEnum;
    sortOrderFunc: (itemA: _EnhancedCoffeeBeans, itemB: _EnhancedCoffeeBeans) => number;
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
    const enhancedCoffeeBeansItems: _EnhancedCoffeeBeans[] = await getAllEnhancedCoffeeBeans();
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
    <CoffeeBeansCard href={routes.coffeeBeansItem(item.name)} {item} sortOrder={sortOrderValue?.value} />
  {/each}
{/if}
<AddRecipeFab href={routes.addRecipe()} />
