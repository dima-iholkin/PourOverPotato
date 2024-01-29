<script lang="ts">
  import MyFab from "$lib/UI/MyFab.svelte";
  import { onMount } from "svelte";
  import { getAllCoffeeBeans } from "../database/indexedDB";
  import type { CoffeeBeans } from "../entities/CoffeeBeans";

  let coffeeBeans: CoffeeBeans[] | undefined;

  onMount(() => {
    getAllCoffeeBeans().then((items) => {
      coffeeBeans = items;
    });
  });
</script>

<svelte:head>
  <title>PourOverPotato app</title>
</svelte:head>

{#if coffeeBeans === undefined}
  <p>waiting...</p>
{:else if coffeeBeans.length === 0}
  <p>No coffee beans added yet.</p>
{:else}
  {#each coffeeBeans as coffeeBeansItem}
    <a href="/beans/{coffeeBeansItem.name}">
      <div style="margin: 16px 0; border: solid #EEEEEE;">
        <p style="font-family: 'Courier New', Courier, monospace; font-size: 20pt; margin: 8px 0;">
          {coffeeBeansItem.name}
        </p>
        <p style="margin: 8px 0;">
          {coffeeBeansItem.details}
        </p>
      </div>
    </a>
  {/each}
{/if}

<MyFab href="/recipes/add" />
