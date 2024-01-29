<script context="module">
  const DESCRIPTION_PH = "Example: Washed process. Notes: plum, cherry.";
</script>

<script lang="ts">
  import Label from "$lib/UI/forms/Label.svelte";
  import Textarea from "$lib/UI/forms/Textarea.svelte";
  import { addCoffeeBeans } from "$lib/database/indexedDB";
  import { CoffeeBeans, CoffeeBeansSubmit } from "$lib/entities/CoffeeBeans";
  import Header from "./components/Header.svelte";

  // Props:

  export let savedCoffeeBeans: CoffeeBeans | undefined = undefined;

  // State:

  let showModal: boolean = false;

  let name: string = "";
  let description: string = "";

  let nameValidationFailed: boolean = false;
  $: {
    nameValidationFailed;
    if (nameValidationFailed === false) {
      validationMessage = "";
    }
  }

  let validationMessage: string = "";

  // Handler functions:

  function openModal() {
    showModal = true;
    // document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
  }

  function closeModal() {
    showModal = false;
    nameValidationFailed = false;
    // document.getElementsByTagName("body")[0].classList.remove("overflow-y-hidden");
  }

  // Close the modal on Escape key.
  function handleEscKey(event: KeyboardEvent) {
    if (showModal && event.key === "Escape") {
      showModal = false;
    }
  }

  async function handleSubmit(event: SubmitEvent) {
    // Validate and save the new coffee beans:

    const coffeeBeansSubmit: CoffeeBeansSubmit | "ValidationFailed_NameMustBeAtLeast3CharsLong" =
      CoffeeBeansSubmit.create(name, description);

    if (coffeeBeansSubmit === "ValidationFailed_NameMustBeAtLeast3CharsLong") {
      nameValidationFailed = true;
      validationMessage = "Name must be at least 3 characters long.";
      return;
    }

    const coffeeBeans: CoffeeBeans | "Failure_NameAlreadyExist" = await addCoffeeBeans(coffeeBeansSubmit);

    if (coffeeBeans === "Failure_NameAlreadyExist") {
      nameValidationFailed = true;
      validationMessage = "Coffee beans with this name already exist.";
      return;
    }

    alert("New coffee beans saved successfully.");
    // TODO: Inform user that the new coffee beans were saved successfully.

    // Return the new Coffee Beans entity to the "Add recipe" page:
    savedCoffeeBeans = coffeeBeans;

    // Clear the modal state:
    closeModal();
    name = "";
    description = "";
  }

  function handleInputChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    if (nameValidationFailed) {
      nameValidationFailed = false;
      validationMessage = "";
    }
  }
</script>

<svelte:window on:keydown={handleEscKey} />

<button class="button-add" on:click|preventDefault={() => openModal()}>
  <span class="material-icons md-18"> add </span>
</button>

<div class="modal-container" class:show-modal={showModal}>
  <div class="inner-container">
    <Header on:click={() => closeModal()}>Add new coffee beans</Header>

    <form class="max-w-sm mx-auto" on:submit|preventDefault={handleSubmit}>
      <div class="mb-5">
        <Label _for="name" valid={!nameValidationFailed}>Coffee beans name:</Label>
        <input
          type="text"
          id="name"
          name="name"
          class={nameValidationFailed ? "input-name-validation-failed" : "input-name"}
          placeholder={nameValidationFailed ? "" : "Example: Rwanda Mabanza"}
          bind:value={name}
          on:input={handleInputChange}
        />
        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{validationMessage}</p>
      </div>
      <div class="my-div mb-5">
        <Label _for="description">Description:</Label>
        <Textarea id="description" name="description" placeholder={DESCRIPTION_PH} bind:value={description} />
      </div>
      <button type="submit" class="button-submit">Save</button>
    </form>
  </div>
</div>

<style lang="postcss">
  .modal-container {
    @apply fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4;
  }

  .show-modal {
    display: block;
  }

  .inner-container {
    @apply relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md;
  }

  .button-add {
    @apply bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-700 transition;

    margin-left: 8px;
  }

  .input-name {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500;
    @apply block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;
  }

  .input-name-validation-failed {
    @apply bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500;
    @apply focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400;

    background-color: #fef2f2;
  }

  .my-div {
    display: inline-block;
    width: 100%;
  }

  .button-submit {
    @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium;
    @apply rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700;
    @apply dark:focus:ring-blue-800;

    width: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1.25rem;
  }
</style>
