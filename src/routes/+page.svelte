<script lang="ts">
  import MyFab from "$lib/UI/MyFab.svelte";
  import CoffeeBeansCard from "$lib/UI/cards/CoffeeBeansCard.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import { getAllCoffeeBeans } from "$lib/database/indexedDB";
  import { routes } from "$lib/domain/routes";
  import type { CoffeeBeans } from "$lib/entities/CoffeeBeans";
  import { onMount } from "svelte";

  // State:

  let coffeeBeans: CoffeeBeans[] | undefined;

  // Lifecycle hooks:

  onMount(() => {
    getAllCoffeeBeans().then((items) => {
      coffeeBeans = items;
    });
  });
</script>

<svelte:head>
  <title>PourOverPotato app</title>
</svelte:head>

<PageHeadline>Coffee beans</PageHeadline>

{#if coffeeBeans !== undefined && coffeeBeans.length > 0}
  {#each coffeeBeans as item}
    <CoffeeBeansCard {item} href={routes.coffeeBeansItem(item.name)} />
  {/each}
{:else if coffeeBeans !== undefined && coffeeBeans.length === 0}
  <p>No coffee beans added yet.</p>
{:else}
  <p>loading...</p>
{/if}

<MyFab href={routes.addRecipe()} />
