<script lang="ts">
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import FlexRow from "$lib/UI/FlexRow.svelte";
  import Card from "./Card.svelte";

  // Props:

  export let item: CoffeeBeans;

  export let recipeCount: number = 0;

  export let href: string;
</script>

<Card {href}>
  <FlexRow>
    <h5>{item.name}</h5>
    <p>{recipeCount} {recipeCount === 1 ? "recipe" : "recipes"}</p>
  </FlexRow>
  <p>{item.description}</p>
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
