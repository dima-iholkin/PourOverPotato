<script context="module" lang="ts">
  const COFFEEBEANS_ID = "coffee-beans";
</script>

<script lang="ts">
  import NewCoffeeBeansModal from "$lib/UI/CoffeeBeansSelect/NewCoffeeBeansModal.svelte";
  import Label from "$lib/UI/forms/Label.svelte";
  import { CoffeeBeans } from "../../../entities/CoffeeBeans";

  // Props:

  export let allCoffeeBeans: CoffeeBeans[] | undefined;

  export let selectedCoffeeBeans: CoffeeBeans | undefined;

  export let validationFailed: boolean = false;

  // State:

  let showEmptyOption: boolean;
  $: showEmptyOption = selectedCoffeeBeans === undefined;

  let selectedCoffeeBeansId: number | undefined = selectedCoffeeBeans?.id;

  let savedCoffeeBeans: CoffeeBeans | undefined;
  $: {
    savedCoffeeBeans;
    if (savedCoffeeBeans instanceof CoffeeBeans) {
      if (allCoffeeBeans?.find((item) => item.id === savedCoffeeBeans?.id) === undefined) {
        allCoffeeBeans?.push(savedCoffeeBeans);
      }
      selectedCoffeeBeans = savedCoffeeBeans; // Set the value in the Select.
      validationFailed = false;
    }
  }

  let validationMessage: string = "";
  $: {
    validationFailed;
    if (validationFailed) {
      validationMessage = "Please select a coffee beans.";
    } else {
      validationMessage = "";
    }
  }

  // Handler functions:

  function handleSelectChange(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
    if (validationFailed) {
      validationFailed = false;
    }

    showEmptyOption = false;
    savedCoffeeBeans = undefined;
  }
</script>

<div class="container">
  <Label _for={COFFEEBEANS_ID} valid={!validationFailed}>Coffee beans:</Label>
  <div class="select-container">
    <select
      name={COFFEEBEANS_ID}
      id={COFFEEBEANS_ID}
      class={validationFailed ? "invalid" : "valid"}
      on:change={handleSelectChange}
      bind:value={selectedCoffeeBeansId}
      disabled={allCoffeeBeans === undefined}
    >
      {#if allCoffeeBeans !== undefined}
        {#if showEmptyOption}
          <option disabled selected value></option>
        {/if}
        {#each allCoffeeBeans as item}
          <option selected={selectedCoffeeBeans?.id === item.id} value={item.id}>{item.name}</option>
        {/each}
      {:else}
        <option disabled selected value>Loading coffee beans...</option>
      {/if}
    </select>
    <NewCoffeeBeansModal bind:savedCoffeeBeans />
  </div>
  <p class="mt-2 text-sm text-red-600 dark:text-red-500">{validationMessage}</p>
</div>

<style lang="postcss">
  .container {
    display: flex;
    align-items: baseline;
  }

  .select-container {
    flex-grow: 1;

    display: flex;
    flex-direction: row;
  }

  select {
    flex-grow: 1;
  }

  .valid {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500;
    @apply p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;
  }

  .invalid {
    @apply bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500;
    @apply focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400;

    background-color: #fef2f2;
  }
</style>
