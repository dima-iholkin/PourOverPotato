<script context="module" lang="ts">
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import {
    sortRecipesByTimestampDesc,
    sortRecipesByTimestampAsc,
    sortRecipesByOutWeightDesc,
    sortRecipesByOutWeightAsc,
    sortRecipesByRatingDesc,
    sortRecipesByRatingAsc,
    sortRecipesByFavorite
  } from "$lib/domain/helpers/sortRecipes";
  import { loadSortOrder, saveSortOrder } from "$lib/localStorage/persistSortOrder";

  const SELECT_ID = "recipes-sort-order";

  const sortOrderEnumEntriesForUI: {
    key: string;
    value: RecipesSortOrderEnum;
    sortOrderFunc: (recipeA: Recipe, recipeB: Recipe) => number;
  }[] = [
    { value: RecipesSortOrderEnum.Latest, key: "latest", sortOrderFunc: sortRecipesByTimestampDesc },
    { value: RecipesSortOrderEnum.Earliest, key: "earliest", sortOrderFunc: sortRecipesByTimestampAsc },
    { value: RecipesSortOrderEnum.Favorite, key: "favorite", sortOrderFunc: sortRecipesByFavorite },
    { value: RecipesSortOrderEnum.BestRating, key: "best rating", sortOrderFunc: sortRecipesByRatingDesc },
    { value: RecipesSortOrderEnum.WorstRating, key: "worst rating", sortOrderFunc: sortRecipesByRatingAsc },
    { value: RecipesSortOrderEnum.BiggerWeight, key: "more coffee", sortOrderFunc: sortRecipesByOutWeightDesc },
    { value: RecipesSortOrderEnum.SmallerWeight, key: "less coffee", sortOrderFunc: sortRecipesByOutWeightAsc }
  ];
</script>

<script lang="ts">
  import { RecipesSortOrderEnum } from "./RecipesSortOrderEnum";

  // Props:
  export let sortOrderValue: {
    value: RecipesSortOrderEnum;
    sortOrderFunc: (recipeA: Recipe, recipeB: Recipe) => number;
  };

  // UI state:
  let value: RecipesSortOrderEnum = loadSortOrder("recipes");

  // Reactivity:
  $: {
    value;
    const sortOrderFunc =
      sortOrderEnumEntriesForUI.find((item) => item.value === value)?.sortOrderFunc ?? sortRecipesByTimestampDesc;
    sortOrderValue = {
      value,
      sortOrderFunc
    };
    saveSortOrder("recipes", value);
  }
</script>

<div class="select-container">
  <p>Sorted by</p>
  <select id={SELECT_ID} name={SELECT_ID} bind:value>
    {#each sortOrderEnumEntriesForUI as item (item.value)}
      <option value={item.value}>{item.key}</option>
    {/each}
  </select>
</div>

<style lang="postcss">
  .select-container {
    /* Inner layout: */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    column-gap: 0.5rem;

    /* Typography: */
    @apply text-base font-normal tracking-tight;

    /* Colors: */
    @apply text-gray-900 dark:text-white;
  }

  select {
    @apply bg-white text-gray-900 border border-gray-300 rounded-lg;
    @apply focus:ring-blue-500 focus:border-blue-500;
    @apply dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;

    padding: 0.625rem 1rem 0.625rem 0.5rem;
  }
</style>
