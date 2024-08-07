<script context="module" lang="ts">
  import type { EnhancedCoffeeBeans } from "$lib/domain/enhancedEntities/EnhancedCoffeeBeans";
  import { CoffeeBeansSortOrderEnum } from "$lib/domain/sort/CoffeeBeansSortOrderEnum";
  import {
    sortCoffeeBeansByName,
    sortCoffeeBeansByNameReverse,
    sortCoffeeBeansByLatestRecipe,
    sortCoffeeBeansByEarliestRecipe,
    sortCoffeeBeansByMoreRecipes,
    sortCoffeeBeansByLessRecipes
  } from "$lib/domain/sort/sortCoffeeBeans";
  import { loadSortOrder, saveSortOrder } from "$lib/localStorage/persistSortOrder";

  const SELECT_ID = "coffeebeans-sort-order";

  const sortOrderEnumEntriesForUI: {
    key: string;
    value: CoffeeBeansSortOrderEnum;
    sortOrderFunc: (itemA: EnhancedCoffeeBeans, itemB: EnhancedCoffeeBeans) => number;
  }[] = [
    { value: CoffeeBeansSortOrderEnum.Name, key: "name", sortOrderFunc: sortCoffeeBeansByName },
    { value: CoffeeBeansSortOrderEnum.NameReverse, key: "name reverse", sortOrderFunc: sortCoffeeBeansByNameReverse },
    {
      value: CoffeeBeansSortOrderEnum.LatestRecipe,
      key: "latest recipe",
      sortOrderFunc: sortCoffeeBeansByLatestRecipe
    },
    {
      value: CoffeeBeansSortOrderEnum.EarliestRecipe,
      key: "earliest recipe",
      sortOrderFunc: sortCoffeeBeansByEarliestRecipe
    },
    {
      value: CoffeeBeansSortOrderEnum.MoreRecipes,
      key: "more recipes",
      sortOrderFunc: sortCoffeeBeansByMoreRecipes
    },
    {
      value: CoffeeBeansSortOrderEnum.LessRecipes,
      key: "less recipes",
      sortOrderFunc: sortCoffeeBeansByLessRecipes
    }
  ];
</script>

<script lang="ts">
  // Props:
  export let sortOrderValue: {
    value: CoffeeBeansSortOrderEnum;
    sortOrderFunc: (itemA: EnhancedCoffeeBeans, itemB: EnhancedCoffeeBeans) => number;
  };

  // UI state:
  let value: CoffeeBeansSortOrderEnum = loadSortOrder("coffeeBeans");

  // Reactivity:
  $: {
    value;
    const sortOrderFunc =
      sortOrderEnumEntriesForUI.find((item) => item.value === value)?.sortOrderFunc ?? sortCoffeeBeansByName;
    sortOrderValue = {
      value,
      sortOrderFunc
    };
    saveSortOrder("coffeeBeans", value);
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
    @apply text-gray-900;
  }

  select {
    @apply bg-white text-gray-900 border border-gray-300 rounded-lg;
    @apply focus:ring-blue-500 focus:border-blue-500;
    padding: 0.625rem 1rem 0.625rem 0.5rem;
  }
</style>
