<script lang="ts">
  import { onMount } from "svelte";
  import { getAllEnhancedCoffeeBeans } from "$lib/database/enhancedCoffeeBeansAPI";
  import { routes } from "$lib/domain/constants/routes";
  import type { EnhancedCoffeeBeans } from "$lib/domain/enhancedEntities/EnhancedCoffeeBeans";
  import type { CoffeeBeansSortOrderEnum } from "$lib/domain/sort/CoffeeBeansSortOrderEnum";
  import { sortCoffeeBeansByName } from "$lib/domain/sort/sortCoffeeBeans";
  import CoffeeBeansCard from "$lib/UI/domainComponents/cards/CoffeeBeansCard.svelte";
  import AddRecipeFab from "$lib/UI/domainComponents/FABs/AddRecipeFab.svelte";
  import Loading from "$lib/UI/domainComponents/lists/Loading.svelte";
  import SortCoffeeBeansSelect from "$lib/UI/domainComponents/lists/SortCoffeeBeansSelect.svelte";
  import AddDemoCoffeeBeans_PageBlock from "$lib/UI/domainComponents/pageBlocks/AddDemoCoffeeBeans_PageBlock.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";

  // Entities state:
  let coffeeBeans: EnhancedCoffeeBeans[] | undefined = $state();

  // Sorting state:
  let sortOrderValue:
    | {
        value: CoffeeBeansSortOrderEnum;
        sortOrderFunc: (itemA: EnhancedCoffeeBeans, itemB: EnhancedCoffeeBeans) => number;
      }
    | undefined = $state();

  // Reactivity:
  const sortedCoffeeBeans: EnhancedCoffeeBeans[] | undefined = $derived(
    coffeeBeans?.toSorted(sortOrderValue?.sortOrderFunc ?? sortCoffeeBeansByName)
  );

  // Lifecycle:
  onMount(() => {
    loadAllCoffeeBeans();
  });

  // Helper:
  async function loadAllCoffeeBeans() {
    const enhancedCoffeeBeansItems: EnhancedCoffeeBeans[] = await getAllEnhancedCoffeeBeans();
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
  {#each sortedCoffeeBeans as item (item.id)}
    <CoffeeBeansCard href={routes.coffeeBeansItem(item.name)} {item} sortOrder={sortOrderValue?.value} />
  {/each}
{/if}
<AddRecipeFab href={routes.addRecipe()} />
