<script lang="ts">
  import MyFab from "$lib/UI/MyFab.svelte";
  import CoffeeBeansCard from "$lib/UI/cards/CoffeeBeansCard.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import { onMount } from "svelte";
  import { getAllCoffeeBeans } from "../database/indexedDB";
  import type { CoffeeBeans } from "../entities/CoffeeBeans";

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
    <CoffeeBeansCard {item} href="/beans/{item.name}" />
  {/each}
{:else if coffeeBeans !== undefined && coffeeBeans.length === 0}
  <p>No coffee beans added yet.</p>
{:else}
  <p>loading...</p>
{/if}

<MyFab href="/recipes/add" />
