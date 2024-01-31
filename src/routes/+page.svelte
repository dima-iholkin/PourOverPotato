<script lang="ts">
  import MyFab from "$lib/UI/MyFab.svelte";
  import CoffeeBeansCard from "$lib/UI/cards/CoffeeBeansCard.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import { getAllCoffeeBeans } from "$lib/database/v1/indexedDB";
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { routes } from "$lib/domain/routes";
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

{#if coffeeBeans === undefined}
  <p>loading...</p>
{:else if coffeeBeans.length === 0}
  <p>No coffee beans added yet.</p>
{:else}
  {#each coffeeBeans as item}
    <CoffeeBeansCard {item} href={routes.coffeeBeansItem(item.name)} />
  {/each}
{/if}

<MyFab href={routes.addRecipe()} />
