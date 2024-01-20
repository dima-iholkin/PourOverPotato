<script lang="ts">
  import { Fab } from "konsta/svelte";
  import { onMount } from "svelte";
  import PlusIcon from "$lib/PlusIcon.svelte";
  import { loadCoffeeBeans } from "../database/localStorage";

  let coffeeBeans: CoffeeBeansItem[] = [];

  onMount(() => {
    coffeeBeans = loadCoffeeBeans();
  });
</script>

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

<Fab class="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20" text="Create" t extPosition="after">
  <a href="/recipes/add">
    <svelte:component this={PlusIcon} slot="icon" />
  </a>
</Fab>
