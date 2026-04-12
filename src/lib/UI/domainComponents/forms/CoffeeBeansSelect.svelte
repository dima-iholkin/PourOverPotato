<script module lang="ts">
  const COFFEEBEANS_ID = "coffee-beans";
</script>

<script lang="ts">
  /* eslint-disable prefer-const */
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { sortCoffeeBeansByName } from "$lib/domain/sort/sortCoffeeBeans";
  import NewCoffeeBeansModal from "$lib/UI/domainComponents/modals/NewCoffeeBeansModal.svelte";
  import Label from "$lib/UI/genericComponents/forms/Label.svelte";

  interface Props {
    /**
     * Bindable, an array of all `CoffeeBeans`.
     * The array will be updated on new `CoffeeBeans` creation. */
    allCoffeeBeans: CoffeeBeans[];
    /**
     * Bindable, selected `CoffeeBeansId` value.
     * If nothing selected, will be `""` or `undefined`. */
    value_CoffeeBeansId: number | "" | undefined;
    /**
     * Optional. Provide an initial `CoffeeBeansId` value for showing unsaved changes state. */
    initialValue_CoffeeBeansId?: number;
    /**
     * Optional. Show a button for adding new `CoffeeBeans`. */
    showButton_NewCoffeeBeans?: boolean;
  }

  // Props:
  let {
    allCoffeeBeans = $bindable(),
    value_CoffeeBeansId = $bindable(),
    initialValue_CoffeeBeansId,
    showButton_NewCoffeeBeans = true
  }: Props = $props();

  // React to clicking New CoffeeBeans button:
  function handleClick_NewButton(event: MouseEvent) {
    event.preventDefault();
    showModal = true;
  }

  // React to event of CoffeeBeans creation:
  function handleEvent_CoffeeBeansCreated(cb: CoffeeBeans) {
    allCoffeeBeans.push(cb);
    value_CoffeeBeansId = cb.id;
    refreshValidationState();
  }

  // Enable refreshing the validation state from outside the component:
  export function refreshValidationState() {
    if (value_CoffeeBeansId === undefined || value_CoffeeBeansId === "") {
      validationMessage = "Please select coffee beans";
      selectDOM?.focus();
    } else {
      validationMessage = "";
    }
  }

  // Show validation state:
  let validationMessage: string = $state("");

  // Show unsaved changes state:
  let unsavedChanges: boolean = $derived(
    initialValue_CoffeeBeansId !== undefined && initialValue_CoffeeBeansId !== value_CoffeeBeansId
  );

  // Show new CoffeeBeans modal:
  let showModal: boolean = $state(false);

  // ----- Inner logic: -----

  // DOM pointers:
  let selectDOM: HTMLSelectElement | undefined;
</script>

<div>
  <div class="container">
    <Label for_={COFFEEBEANS_ID} valid={validationMessage === ""}>Coffee beans:</Label>
    <div class="select-container">
      <select
        id={COFFEEBEANS_ID}
        class={validationMessage === "" ? "valid" : "invalid"}
        disabled={allCoffeeBeans === undefined}
        name={COFFEEBEANS_ID}
        tabindex="0"
        bind:this={selectDOM}
        bind:value={value_CoffeeBeansId}
        class:unsaved-changes={unsavedChanges}
      >
        {#if allCoffeeBeans === undefined}
          <option disabled selected value>Loading coffee beans...</option>
        {/if}
        {#if allCoffeeBeans}
          {#if value_CoffeeBeansId === undefined && showButton_NewCoffeeBeans === true}
            <option disabled selected value></option>
          {/if}
          {#each allCoffeeBeans.sort(sortCoffeeBeansByName) as item (item.id)}
            <option selected={value_CoffeeBeansId === item.id} value={item.id}>{item.name}</option>
          {/each}
        {/if}
      </select>
      {#if showButton_NewCoffeeBeans}
        <button
          class="button-add bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-700 transition"
          onclick={handleClick_NewButton}
        >
          <span class="material-icons md-18"> add </span>
        </button>
        <NewCoffeeBeansModal onCoffeeBeansAdded={handleEvent_CoffeeBeansCreated} isShown={showModal} />
      {/if}
    </div>
  </div>
  <p class="text-sm text-red-600" class:mt-2={validationMessage.length > 0}>{validationMessage}</p>
</div>

<style lang="postcss">
  @reference "tailwindcss";

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
