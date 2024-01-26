<script context="module" lang="ts">
  const COFFEEBEANS_ID = "coffee-beans";
  const NEW_COFFEEBEANS_NAME = "new-coffee-beans";
  const NEW_COFFEEBEANS_PLACEHOLDER = "Example: Brazil Mogiana";
</script>

<script lang="ts">
  import type { CoffeeBeans } from "../../../entities/CoffeeBeans";
  import NewCoffeeBeansModal from "./NewCoffeeBeansModal.svelte";

  // Props:

  export let allCoffeeBeans: CoffeeBeans[] | undefined;

  export let selectedCoffeeBeans: CoffeeBeans | undefined;

  // State:

  let showEmptyOption: boolean;
  $: showEmptyOption = selectedCoffeeBeans === undefined;

  let selectedCoffeeBeansId: number | undefined = selectedCoffeeBeans?.id;

  // Handler functions:

  function handleSelectChange(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
    showEmptyOption = false;

    // if (event.currentTarget?.value === "create_new") {
    //   showNewCoffeeBeansInput = true;
    // } else {
    //   showNewCoffeeBeansInput = false;
    // }
  }
</script>

{#if allCoffeeBeans !== undefined}
  <div>
    <label for={COFFEEBEANS_ID} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Coffee beans:
    </label>
    <div class="select-container">
      <select
        name={COFFEEBEANS_ID}
        id={COFFEEBEANS_ID}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        on:change={handleSelectChange}
        bind:value={selectedCoffeeBeansId}
      >
        {#if showEmptyOption}
          <option disabled selected value></option>
        {/if}
        {#each allCoffeeBeans as item}
          <option selected={selectedCoffeeBeans?.id === item.id} value={item.id}>{item.name}</option>
        {/each}
        <!-- <option value="create_new">create new...</option> -->
      </select>
      <NewCoffeeBeansModal />
    </div>

    <!-- {#if showNewCoffeeBeansInput}
      <label for={NEW_COFFEEBEANS_NAME}>New coffee beans name:</label>
      <input
        name={NEW_COFFEEBEANS_NAME}
        id={NEW_COFFEEBEANS_NAME}
        type="text"
        placeholder={NEW_COFFEEBEANS_PLACEHOLDER}
        required
        minlength="3"
        bind:value={newCoffeeBeansName}
      />
    {/if} -->
  </div>
{:else}
  <div>Loading coffee beans...</div>
{/if}

<style>
  .select-container {
    display: flex;
    flex-direction: row;
  }

  select {
    flex-grow: 1;
  }
</style>
