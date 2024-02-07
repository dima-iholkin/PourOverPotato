<script context="module">
  const DESCRIPTION_PH = "Example: Washed process. Notes: plum, cherry.";
</script>

<script lang="ts">
  import { tick } from "svelte";
  import { editCoffeeBeans } from "$lib/database/v1/indexedDB";
  import { CoffeeBeans, CoffeeBeansEditSubmit } from "$lib/domain/entities/CoffeeBeans";
  import { routes } from "$lib/domain/routes";
  import ModalHeader from "$lib/UI/CoffeeBeansSelect/components/ModalHeader.svelte";
  import Label from "$lib/UI/forms/Label.svelte";
  import Textarea from "$lib/UI/forms/Textarea.svelte";
  import MySidebar from "$lib/UI/layout/components/MySidebar.svelte";

  // Props:

  export let coffeeBeansItem: CoffeeBeans;

  // State:

  let showModal: boolean = false;

  let modalDom: Element;
  let menuButtonDom: Element;
  let inputDom: HTMLInputElement;
  let textareaDom: HTMLTextAreaElement;
  let formDom: HTMLFormElement;

  let name: string = coffeeBeansItem.name;
  let description: string = coffeeBeansItem.description;

  let nameValidationFailed: boolean = false;
  $: {
    if (nameValidationFailed === false) {
      validationMessage = "";
    }
  }

  let validationMessage: string = "";

  // Handler functions:

  function openModal() {
    showModal = true;

    tick().then(() => {
      inputDom.focus();
    });

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

  function handleEnterKey(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    if (event.key === "Enter") {
      event.preventDefault();
      textareaDom.focus();
    }
  }

  function handleCtrlEnterKey(event: KeyboardEvent) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      formDom.requestSubmit();
    }
  }

  async function handleSubmit() {
    // Validate and save the edited coffee beans:

    const editedCoffeeBeans: CoffeeBeans = new CoffeeBeans({ name, description }, coffeeBeansItem.id);

    const coffeeBeansSubmit: CoffeeBeansEditSubmit | "ValidationFailed_NameMustBeAtLeast3CharsLong" =
      CoffeeBeansEditSubmit.create(editedCoffeeBeans);

    if (coffeeBeansSubmit === "ValidationFailed_NameMustBeAtLeast3CharsLong") {
      nameValidationFailed = true;
      validationMessage = "Name must be at least 3 characters long.";
      return;
    }

    const coffeeBeans: CoffeeBeans | "Failure_NameAlreadyExist" = await editCoffeeBeans(coffeeBeansSubmit);

    if (coffeeBeans === "Failure_NameAlreadyExist") {
      nameValidationFailed = true;
      validationMessage = "Coffee beans with this name exist already.";
      return;
    }

    alert("We saved the edited coffee beans successfully.");
    // TODO: Inform user that the new coffee beans were saved successfully.

    // Return the new Coffee Beans entity to the "Add recipe" page:
    coffeeBeansItem = coffeeBeans;

    // Clear the modal state:
    closeModal();

    // Reload the page with the new CoffeeBeans name, to avoid any stale state:
    window.location.replace(routes.coffeeBeansItem(coffeeBeans.name));
  }

  function handleInputChange() {
    if (nameValidationFailed) {
      nameValidationFailed = false;
      validationMessage = "";
    }
  }

  function handleDocumentClick(event: MouseEvent & { currentTarget: EventTarget & Document }) {
    if (showModal === false) {
      return;
    }

    if (clickOutsideBox(modalDom, event) && clickOutsideBox(menuButtonDom, event)) {
      closeModal();
    }
  }

  // Helper functions:

  function clickOutsideBox(element: Element, click: MouseEvent) {
    const box: DOMRect = element.getBoundingClientRect();
    const x: number = click.clientX;
    const y: number = click.clientY;

    if (x < box.left || x > box.right || y < box.top || y > box.bottom) {
      return true;
    }

    return false;
  }
</script>

<svelte:window on:keydown={handleEscKey} />

<svelte:document on:mousedown={handleDocumentClick} />

<button class="edit-button" type="button" bind:this={menuButtonDom} on:click={() => openModal()}> Edit </button>

<div class="modal-container" class:show-modal={showModal}>
  <MySidebar asGap />
  <div class="inner-container" bind:this={modalDom}>
    <ModalHeader on:click={() => closeModal()}>Edit coffee beans</ModalHeader>

    <form class="max-w-sm mx-auto" bind:this={formDom} on:submit|preventDefault={handleSubmit}>
      <div class="mb-5">
        <Label _for="name" valid={!nameValidationFailed}>Coffee beans name:</Label>
        <input
          class={nameValidationFailed ? "input-name-validation-failed" : "input-name"}
          id="name"
          name="name"
          placeholder={nameValidationFailed ? "" : "Example: Rwanda Mabanza"}
          type="text"
          bind:this={inputDom}
          bind:value={name}
          on:input={handleInputChange}
          on:keydown={handleEnterKey}
        />
        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{validationMessage}</p>
      </div>
      <div class="my-div mb-5">
        <Label _for="description">Description:</Label>
        <Textarea
          id="description"
          name="description"
          placeholder={DESCRIPTION_PH}
          bind:_this={textareaDom}
          bind:value={description}
          on:keydown={handleCtrlEnterKey}
        />
      </div>
      <button class="button-submit" type="submit">Save</button>
    </form>
  </div>
</div>

<style lang="postcss">
  .modal-container {
    @apply fixed hidden inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4;

    flex-direction: row;
    justify-content: center;
    align-items: center;

    z-index: 50;
  }

  .show-modal {
    display: flex;
  }

  .inner-container {
    @apply relative mx-auto shadow-xl rounded-md bg-white max-w-md;

    padding-left: 16px;
    padding-right: 16px;

    flex-grow: 1;
  }

  .edit-button {
    @apply text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4;
    @apply focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800;
    @apply dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600;
    @apply dark:focus:ring-gray-700;

    margin: 0.5rem 0 0 0;
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
