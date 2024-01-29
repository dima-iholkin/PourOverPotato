<script lang="ts">
  import type { CoffeeBeans } from "../../../entities/CoffeeBeans";
  import Card from "./Card.svelte";

  // Props:

  export let item: CoffeeBeans;

  export let href: string;
</script>

<Card {href}>
  <h5>{item.name}</h5>
  <p>{item.details}</p>
</Card>

<style lang="postcss">
  h5 {
    @apply text-2xl font-bold tracking-tight text-gray-900 dark:text-white;

    margin-bottom: 8px;
  }

  p {
    @apply font-normal text-gray-700 dark:text-gray-400;
  }
</style>
