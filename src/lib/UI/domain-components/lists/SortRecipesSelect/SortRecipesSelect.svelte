<script context="module" lang="ts">
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import {
    sortRecipesByTimestampDesc,
    sortRecipesByTimestampAsc,
    sortRecipesByOutWeightDesc,
    sortRecipesByOutWeightAsc,
    sortRecipesByRatingDesc
  } from "$lib/domain/helpers/sortRecipes";
  import { loadSortOrder, saveSortOrder } from "$lib/persistForms/persistSortOrder";

  const SORT_RECIPES_ID = "sort-recipes-";

  const sortOrderEnumEntriesForUI: {
    key: string;
    value: RecipesSortOrderEnum;
    sortOrderFunc: (recipeA: Recipe, recipeB: Recipe) => number;
  }[] = [
    { value: RecipesSortOrderEnum.Latest, key: "latest", sortOrderFunc: sortRecipesByTimestampDesc },
    { value: RecipesSortOrderEnum.Earliest, key: "earliest", sortOrderFunc: sortRecipesByTimestampAsc },
    { value: RecipesSortOrderEnum.GreatestRating, key: "best rating", sortOrderFunc: sortRecipesByRatingDesc },
    { value: RecipesSortOrderEnum.BiggerWeight, key: "more coffee", sortOrderFunc: sortRecipesByOutWeightDesc },
    { value: RecipesSortOrderEnum.SmallerWeight, key: "less coffee", sortOrderFunc: sortRecipesByOutWeightAsc }
  ];
</script>

<script lang="ts">
  import { RecipesSortOrderEnum } from "./RecipesSortOrderEnum";

  // Events:

  export let onChange: (
    selected: RecipesSortOrderEnum,
    sortOrderFunc: (recipeA: Recipe, recipeB: Recipe) => number
  ) => void;

  // Props:

  export let pageName: string;
  const selectId = SORT_RECIPES_ID + pageName;

  // UI state:

  let selected: RecipesSortOrderEnum = loadSortOrder(selectId);

  // Handlers:

  function handleSelectChange() {
    const sortOrderFunc =
      sortOrderEnumEntriesForUI.find((item) => item.value === selected)?.sortOrderFunc ?? sortRecipesByTimestampDesc;
    onChange(selected, sortOrderFunc);
    saveSortOrder(selectId, selected);
  }
</script>

<div class="select-container">
  <p>Sorted by</p>
  <select id={selectId} class="valid" name={selectId} bind:value={selected} on:change={handleSelectChange}>
    {#each sortOrderEnumEntriesForUI as item (item.value)}
      <option value={item.value}>{item.key}</option>
    {/each}
  </select>
</div>

<style lang="postcss">
  .select-container {
    /* Outer layout: */
    /* margin-top: 1rem; */

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

  p {
  }

  select {
    /* flex-grow: 1;
    width: 100%; */
  }

  .valid {
    @apply border border-gray-300 text-gray-900 rounded-lg;
    @apply focus:ring-blue-500 focus:border-blue-500;
    @apply dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;

    padding: 0.625rem 1rem 0.625rem 0.5rem;
  }
</style>
