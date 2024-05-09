<script lang="ts">
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import Card from "$lib/UI/genericComponents/Card.svelte";

  // Entity props:
  export let item: CoffeeBeans;
  export let recipeCount: number = 0;

  // UI props:
  export let href: string;
</script>

<Card {href}>
  <div class="flex-row">
    <div class="flex-card-row">
      <h5>{item.name}</h5>
      <p class="recipes-count">{recipeCount} {recipeCount === 1 ? "recipe" : "recipes"}</p>
    </div>
  </div>
  <p class="content">{item.description}</p>
</Card>

<style lang="postcss">
  .flex-row {
    margin-bottom: 0.5rem;
  }

  .flex-card-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
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
    margin-top: 0.35rem;
  }

  .content {
    white-space: pre-line;
  }
</style>
