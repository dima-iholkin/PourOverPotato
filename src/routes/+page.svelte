<script lang="ts">
  import { onMount } from "svelte";
  import { Link } from "konsta/svelte";
  import { loadCoffeeBeans } from "../database/localStorage";

  let coffeeBeans: CoffeeBeansItem[] = [];

  onMount(() => {
    coffeeBeans = loadCoffeeBeans();
  });
</script>

<a href="/demo">Demo</a>

{#each coffeeBeans as coffeeBeansItem}
  <div style="margin: 16px 0;">
    <p style="font-family: 'Courier New', Courier, monospace; font-size: 20pt; margin: 8px 0;">
      {coffeeBeansItem.name}
    </p>
    <p style="margin: 8px 0;">
      {coffeeBeansItem.details}
    </p>
  </div>
{/each}
