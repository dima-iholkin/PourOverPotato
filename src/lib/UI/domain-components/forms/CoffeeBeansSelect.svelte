<script context="module" lang="ts">
  const COFFEEBEANS_ID = "coffee-beans";
</script>

<script lang="ts">
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import NewCoffeeBeansModal from "$lib/UI/domain-components/modals/NewCoffeeBeansModal.svelte";
  import Label from "$lib/UI/generic-components/forms/Label.svelte";

  // Events:

  export let onSavedCoffeeBeans: ((coffeeBeans: CoffeeBeans) => void) | undefined = undefined;

  // Bound functions:

  let setModalState: ((state: "open" | "closed") => void) | undefined;

  // Entity props:

  export let allCoffeeBeans: CoffeeBeans[] | undefined;
  export let selectedCoffeeBeansId: number | undefined;

  // UI props:

  export let validationFailed: boolean = false;
  export let showAddButton: boolean = true;

  // UI state:

  let validationMessage: string = "";

  // Reactivity:

  $: {
    if (validationFailed) {
      validationMessage = "Please select coffee beans.";
    } else {
      validationMessage = "";
    }
  }

  // Handlers:

  function handleSelectChange() {
    if (validationFailed) {
      validationFailed = false;
    }
  }
</script>

<div>
  <div class="container">
    <Label for_={COFFEEBEANS_ID} valid={!validationFailed}>Coffee beans:</Label>
    <div class="select-container">
      <select
        id={COFFEEBEANS_ID}
        class={validationFailed ? "invalid" : "valid"}
        disabled={allCoffeeBeans === undefined}
        name={COFFEEBEANS_ID}
        bind:value={selectedCoffeeBeansId}
        on:change={handleSelectChange}
      >
        {#if allCoffeeBeans !== undefined}
          {#if selectedCoffeeBeansId === undefined && showAddButton === true}
            <option disabled selected value></option>
          {/if}
          {#each allCoffeeBeans as item (item.id)}
            <option selected={selectedCoffeeBeansId === item.id} value={item.id}>{item.name}</option>
          {/each}
        {:else}
          <option disabled selected value>Loading coffee beans...</option>
        {/if}
      </select>
      {#if showAddButton}
        <button
          class="button-add bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-700 transition"
          on:click|preventDefault={() => {
            if (setModalState !== undefined) {
              setModalState("open");
            }
          }}
        >
          <span class="material-icons md-18"> add </span>
        </button>
        <NewCoffeeBeansModal {onSavedCoffeeBeans} bind:setModalState />
      {/if}
    </div>
  </div>
  <p class="text-sm text-red-600 dark:text-red-500" class:mt-2={validationMessage.length > 0}>{validationMessage}</p>
</div>

<style lang="postcss">
  .container {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
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
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg p-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
    @apply dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;
  }

  .invalid {
    @apply bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-base rounded-lg focus:ring-red-500;
    @apply focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400;

    background-color: #fef2f2;
  }

  .button-add {
    margin-left: 8px;
  }
</style>
