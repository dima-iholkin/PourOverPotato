<script context="module">
  const DESCRIPTION_PH = "Example: Washed process. Notes: plum, cherry.";
</script>

<script lang="ts">
  import { tick } from "svelte";
  import { goto } from "$app/navigation";
  import { editCoffeeBeans } from "$lib/database/current/manageCoffeeBeans";
  import { routes } from "$lib/domain/constants/routes";
  import { CoffeeBeans, CoffeeBeansEditSubmit } from "$lib/domain/entities/CoffeeBeans";
  import Label from "$lib/UI/generic-components/forms/Label.svelte";
  import Textarea from "$lib/UI/generic-components/forms/Textarea.svelte";
  import Modal from "$lib/UI/generic-components/modals/Modal.svelte";
  import { addToast } from "$lib/UI/generic-components/toasts/toastProvider";

  // Trigger:
  export const setModalState = (state: "open" | "closed") => {
    setModalState_(state);
  };

  // Entity props:
  export let item: CoffeeBeans;

  // Bind triggers:
  let bindResizeTextarea: () => void;
  let setFocusToModal: () => void;
  let setModalState_: (state: "open" | "closed") => void;

  // Bind DOM elements:
  let formDom: HTMLFormElement;
  let inputDom: HTMLInputElement;
  let saveButtonDOM: HTMLButtonElement;
  let textareaDom: HTMLTextAreaElement;

  // UI state:
  let name: string = item.name ?? "";
  let description: string = item.description ?? "";
  let validationMessage: string = "";

  // Reactivity:
  let nameValidationFailed: boolean = false;
  $: {
    if (nameValidationFailed === false) {
      validationMessage = "";
    }
  }

  // Handlers:

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
    const editedCoffeeBeans: CoffeeBeans = new CoffeeBeans({ id: item.id, name, description });
    const coffeeBeansSubmit: CoffeeBeansEditSubmit | "ValidationFailed_NameMustBeAtLeast3CharsLong" =
      CoffeeBeansEditSubmit.create(editedCoffeeBeans);
    // Guard clause:
    if (coffeeBeansSubmit === "ValidationFailed_NameMustBeAtLeast3CharsLong") {
      nameValidationFailed = true;
      validationMessage = "Name must be at least 3 characters long.";
      return;
    }
    // The happy path:
    const coffeeBeans: CoffeeBeans | "Failure_NameAlreadyExist" | "CoffeeBeansNotFound" =
      await editCoffeeBeans(coffeeBeansSubmit);
    // Guard clauses:
    if (coffeeBeans === "Failure_NameAlreadyExist") {
      nameValidationFailed = true;
      validationMessage = "Coffee beans with this name exist already.";
      return;
    }
    if (coffeeBeans === "CoffeeBeansNotFound") {
      nameValidationFailed = false;
      addToast("CoffeeBeans not found in the database. Operation aborted.");
      return;
    }
    // Show a toast:
    addToast(`Coffee beans "${coffeeBeans.name}" changes saved.`);
    // Return the new Coffee Beans entity to the "Add recipe" page:
    item = coffeeBeans;
    // Clear the modal state:
    setModalState_("closed");
    // Reload the page with the new CoffeeBeans name, to avoid any stale state:
    goto(routes.home).then(() => goto(routes.coffeeBeansItem(coffeeBeans.name)));
  }

  function handleModalStateChange(state: "open" | "closed") {
    if (state === "open") {
      name = item.name ?? "";
      description = item.description ?? "";
      validationMessage = "";
      tick().then(() => {
        bindResizeTextarea();
        inputDom.focus();
      });
    }
  }

  function handleInputChange() {
    if (nameValidationFailed) {
      nameValidationFailed = false;
      validationMessage = "";
    }
  }

  function handleSaveButtonTabKeydown(event: KeyboardEvent) {
    if (event.key === "Tab" && event.shiftKey === false) {
      event.preventDefault();
      setFocusToModal();
    }
  }

  function handleInputFocusIn(event: FocusEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    const textLength = event.currentTarget.value.length;
    inputDom.setSelectionRange(textLength, textLength);
  }
</script>

<Modal
  onFocusReverse={() => saveButtonDOM.focus()}
  onStateChange={handleModalStateChange}
  title="Edit coffee beans"
  bind:setFocus={setFocusToModal}
  bind:setState={setModalState_}
>
  <form class="mx-auto" bind:this={formDom} on:submit|preventDefault={handleSubmit}>
    <div class="mb-5">
      <Label for_="name" valid={!nameValidationFailed}>Coffee beans name:</Label>
      <input
        id="name"
        autocomplete="off"
        class={nameValidationFailed ? "input-name-validation-failed" : "input-name"}
        name="name"
        placeholder={nameValidationFailed ? "" : "Example: Rwanda Mabanza"}
        type="text"
        bind:this={inputDom}
        bind:value={name}
        on:focusin={handleInputFocusIn}
        on:input={handleInputChange}
        on:keydown={handleEnterKey}
      />
      <p class="mt-2 text-sm text-red-600 dark:text-red-500">{validationMessage}</p>
    </div>
    <div class="my-div mb-5">
      <Textarea
        id="description"
        label="Description:"
        name="description"
        placeholder={DESCRIPTION_PH}
        bind:resizeTextarea={bindResizeTextarea}
        bind:this_={textareaDom}
        bind:value={description}
        on:keydown={handleCtrlEnterKey}
      />
    </div>
    <button class="button-submit" type="submit" bind:this={saveButtonDOM} on:keydown={handleSaveButtonTabKeydown}>
      Save
    </button>
  </form>
</Modal>

<style lang="postcss">
  .input-name {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
    @apply dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;
  }

  .input-name-validation-failed {
    @apply border border-red-500 text-red-900 placeholder-red-700 text-base rounded-lg focus:ring-red-500;
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
