<script lang="ts">
  import { onMount } from "svelte";
  import { getAllCoffeeBeans } from "$lib/database/manageCoffeeBeans";
  import { getRecipesByCoffeeBeansId } from "$lib/database/manageRecipes";
  import { routes } from "$lib/domain/constants/routes";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { sortCoffeeBeansByTimestampDesc as byTimestampDescCB } from "$lib/domain/helpers/sortCoffeeBeans";
  import { sortRecipesByTimestampDesc as byTimestampDescR } from "$lib/domain/helpers/sortRecipes";
  import CoffeeBeansCard from "$lib/UI/domainComponents/cards/CoffeeBeansCard.svelte";
  import AddRecipeFab from "$lib/UI/domainComponents/FABs/AddRecipeFab.svelte";
  import Loading from "$lib/UI/domainComponents/lists/Loading.svelte";
  import SortedByP from "$lib/UI/domainComponents/lists/SortedByP.svelte";
  import AddDemoCoffeeBeans_PageBlock from "$lib/UI/domainComponents/pageBlocks/AddDemoCoffeeBeans_PageBlock.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import type { EnhancedCoffeeBeans } from "./EnhancedCoffeeBeans";

  // Entity state:
  let coffeeBeans: EnhancedCoffeeBeans[] | undefined;

  // Lifecycle:
  onMount(() => {
    loadAllCoffeeBeans();
  });

  // Helper:
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
  <SortedByP>Sorted by latest recipe</SortedByP>
  {#each coffeeBeans as item (item.id)}
    <CoffeeBeansCard href={routes.coffeeBeansItem(item.name)} {item} recipeCount={item.recipeCount} />
  {/each}
{/if}
<AddRecipeFab href={routes.addRecipe()} />
