<script lang="ts">
  import type { EnhancedCoffeeBeans } from "$lib/domain/enhancedEntities/EnhancedCoffeeBeans";
  import { CoffeeBeansSortOrderEnum } from "$lib/domain/sort/CoffeeBeansSortOrderEnum";
  import { convertToTimeAgo } from "$lib/helpers/dateHelpers";
  // eslint-disable-next-line max-len
  import Card from "$lib/UI/genericComponents/Card.svelte";

  // Entity props:
  export let item: EnhancedCoffeeBeans;

  // UI props:
  export let href: string;
  export let sortOrder: CoffeeBeansSortOrderEnum | undefined = CoffeeBeansSortOrderEnum.LatestRecipe;
</script>

<Card {href}>
  <div class="card-content">
    <h5>{item.name}</h5>
    <p class="coffee-beans-description">{item.description}</p>
    <div class="header">
      {#if sortOrder === CoffeeBeansSortOrderEnum.EarliestRecipe && item.earliestRecipeTimestamp}
        <p class="time-ago-info">🕒 {convertToTimeAgo(item.earliestRecipeTimestamp)} (earliest)</p>
      {:else if item.latestRecipeTimestamp}
        <p class="time-ago-info">🕒 {convertToTimeAgo(item.latestRecipeTimestamp)}</p>
      {:else}
        <div />
      {/if}
      <p class="recipes-count">{item.recipeCount} {item.recipeCount === 1 ? "recipe" : "recipes"}</p>
    </div>
  </div>
</Card>

<style lang="postcss">
  .card-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .time-ago-info {
    /* Truncate the time ago text, if it's too long and doesn't fit on the single row with other info: */
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .recipes-count {
    white-space: nowrap;
  }

  h5 {
    @apply text-2xl font-bold tracking-tight text-gray-900;
    overflow-wrap: anywhere;
  }

  .coffee-beans-description {
    white-space: pre-line;
  }

  p {
    @apply font-normal text-gray-700;
  }
</style>
