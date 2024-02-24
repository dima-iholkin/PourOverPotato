<script lang="ts">
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { naming } from "$lib/domain/naming";
  import { convertToTimeAgo } from "$lib/helpers/dateHelpers";
  import Card from "$lib/UI/generic-components/Card.svelte";

  // Entities props:

  export let recipe: Recipe;

  // UI props:

  export let coffeeBeansName: string;
  export let href: string | undefined;
</script>

<Card {href}>
  <div class="card-content">
    <div class="header">
      <p>🕒 {convertToTimeAgo(recipe.timestamp)}</p>
      <div class="right-header-horizontal">
        {#if recipe.rating > 0}
          <p>{recipe.rating}⭐</p>
        {/if}
        {#if recipe.outWeight > 0}
          <p>{recipe.outWeight}g ☕</p>
        {/if}
      </div>
    </div>
    <h5>{coffeeBeansName}</h5>
    <div>
      <p class="text-gray-400 inline">{naming.recipe.recipeTarget}:</p>
      <p class="inline">{recipe.recipeTarget}</p>
    </div>
    <div>
      <p class="text-gray-400 inline">{naming.recipe.recipeResult}:</p>
      <p class="inline">{recipe.recipeResult}</p>
    </div>
    <div>
      <p class="text-gray-400 inline">{naming.recipe.recipeThoughts}:</p>
      <p class="inline">{recipe.recipeThoughts}</p>
    </div>
  </div>
</Card>

<style lang="postcss">
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  h5 {
    @apply text-2xl font-bold tracking-tight text-gray-900 dark:text-white;
  }

  .right-header-horizontal {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    white-space: nowrap;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  p {
    @apply font-normal dark:text-gray-400;
  }
</style>
