<script lang="ts">
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import Card from "$lib/UI/generic-components/Card.svelte";
  import FlexRow from "$lib/UI/generic-components/FlexRow.svelte";

  // Props:

  export let item: CoffeeBeans;

  export let recipeCount: number = 0;

  export let href: string;
</script>

<Card {href}>
  <div class="flex-row">
    <FlexRow>
      <h5>{item.name}</h5>
      <p class="recipes-count">{recipeCount} {recipeCount === 1 ? "recipe" : "recipes"}</p>
    </FlexRow>
  </div>
  <p class="content">{item.description}</p>
</Card>

<style lang="postcss">
  .flex-row {
    margin-bottom: 0.5rem;
  }

  h5 {
    @apply text-2xl font-bold tracking-tight text-gray-900 dark:text-white;
    overflow-wrap: anywhere;
  }

  p {
    @apply font-normal text-gray-700 dark:text-gray-400;
  }

  .recipes-count {
    white-space: nowrap;
  }

  .content {
    white-space: pre-line;
  }
</style>
