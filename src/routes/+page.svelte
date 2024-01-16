<script lang="ts">
  import { onMount } from "svelte";
  import { loadCoffeeBeans } from "../database/localStorage";
  import { Card } from "@svelteuidev/core";

  let coffeeBeans: CoffeeBeansItem[] = [];

  onMount(() => {
    coffeeBeans = loadCoffeeBeans();
  });
</script>

{#each coffeeBeans as coffeeBeansItem}
  <Card style="margin: 16px 0;">
    <p style="font-family: 'Courier New', Courier, monospace; font-size: 20pt; margin: 8px 0;">
      {coffeeBeansItem.name}
    </p>
    <p style="margin: 8px 0;">
      {coffeeBeansItem.details}
    </p>
  </Card>
{/each}
