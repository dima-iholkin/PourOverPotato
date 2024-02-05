<script lang="ts">
  import { onMount } from "svelte";
  import { getAllCoffeeBeans, getRecipesCountByCoffeeBeansId } from "$lib/database/v1/indexedDB";
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { routes } from "$lib/domain/routes";
  import CoffeeBeansCard from "$lib/UI/cards/CoffeeBeansCard.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import MyFab from "$lib/UI/MyFab.svelte";

  // State:

  let coffeeBeans: (CoffeeBeans & { recipeCount: number })[] | undefined;

  // Lifecycle hooks:

  onMount(() => {
    getAllCoffeeBeans().then((items) => {
      coffeeBeans = items as (CoffeeBeans & { recipeCount: number })[];
      coffeeBeans?.forEach(async (item) => {
        item.recipeCount = await getRecipesCountByCoffeeBeansId(item.id);
        coffeeBeans = coffeeBeans;
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
  <p>No coffee beans added yet.</p>
{:else}
  {#each coffeeBeans as item (item.id)}
    <CoffeeBeansCard href={routes.coffeeBeansItem(item.name)} recipeCount={item.recipeCount} {item} />
  {/each}
{/if}

<MyFab href={routes.addRecipe()} />
