<script context="module" lang="ts">
  const COFFEEBEANS_ID = "coffee-beans";
</script>

<script lang="ts">
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { sortCoffeeBeansByName } from "$lib/domain/sort/sortCoffeeBeans";
  import NewCoffeeBeansModal from "$lib/UI/domainComponents/modals/NewCoffeeBeansModal.svelte";
  import Label from "$lib/UI/genericComponents/forms/Label.svelte";

  // Events:
  export let onSavedCoffeeBeans: ((coffeeBeans: CoffeeBeans) => void) | undefined = undefined;

  // Triggers:
  export const setValidationFailed = (state: boolean) => {
    validationFailed = state;
    if (validationFailed) {
      validationMessage = "Please select coffee beans.";
    } else {
      validationMessage = "";
    }
  };

  // Entity props:
  export let allCoffeeBeans: CoffeeBeans[] | undefined;
  export let selectedCoffeeBeansId: number | "" | undefined;

  // UI props:
  export let showAddButton: boolean = true;
  export let selectDOM: HTMLSelectElement | undefined = undefined;
  export let initialCoffeeBeansId: number | undefined = undefined;

  // Bind triggers:
  let setModalState: ((state: "open" | "closed") => void) | undefined;

  // UI state:
  let validationFailed: boolean = false;
  let validationMessage: string = "";

  // Handlers:
  function handleSelectChange() {
    if (validationFailed) {
      setValidationFailed(false);
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
        tabindex="0"
        bind:this={selectDOM}
        bind:value={selectedCoffeeBeansId}
        class:unsaved-changes={initialCoffeeBeansId !== undefined && initialCoffeeBeansId !== selectedCoffeeBeansId}
        on:change={handleSelectChange}
      >
        {#if allCoffeeBeans !== undefined}
          {#if selectedCoffeeBeansId === undefined && showAddButton === true}
            <option disabled selected value></option>
          {/if}
          {#each allCoffeeBeans.sort(sortCoffeeBeansByName) as item (item.id)}
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
  <p class="text-sm text-red-600" class:mt-2={validationMessage.length > 0}>{validationMessage}</p>
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
    width: 100%;
  }

  .valid {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg p-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
  }

  .invalid {
    @apply bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-base rounded-lg focus:ring-red-500;
    @apply focus:border-red-500 block w-full p-2.5;
    background-color: #fef2f2;
  }

  .unsaved-changes {
    border-color: yellowgreen;
    outline-color: yellowgreen;
  }

  .button-add {
    margin-left: 8px;
  }
</style>
