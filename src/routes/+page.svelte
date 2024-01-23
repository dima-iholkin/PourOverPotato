<script lang="ts">
  import { onMount } from "svelte";
  import { Fab } from "konsta/svelte";
  import PlusIcon from "$lib/PlusIcon.svelte";
  import type { CoffeeBeans } from "../entities/CoffeeBeans";
  import { getAllCoffeeBeans } from "../database/indexedDB";

  let coffeeBeans: CoffeeBeans[] | undefined;

  onMount(() => {
    getAllCoffeeBeans().then((items) => {
      coffeeBeans = items;
    });
  });
</script>

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

<Fab class="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20" text="Create" href="/recipes/add">
  <svelte:component this={PlusIcon} slot="icon" />
</Fab>
