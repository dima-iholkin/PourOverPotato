<script context="module">
  const DESCRIPTION_PH = "Example: Washed process. Notes: plum, cherry.";
</script>

<script lang="ts">
  import { tick } from "svelte";
  import { goto } from "$app/navigation";
  import { checkCoffeeBeansDuplicate, editCoffeeBeans } from "$lib/database/manageCoffeeBeans";
  import { routes } from "$lib/domain/constants/routes";
  import { CoffeeBeans, CoffeeBeansEditSubmit } from "$lib/domain/entities/CoffeeBeans";
  import Label from "$lib/UI/genericComponents/forms/Label.svelte";
  import Textarea from "$lib/UI/genericComponents/forms/Textarea.svelte";
  import Modal from "$lib/UI/genericComponents/modals/Modal.svelte";
  import { addToast } from "$lib/UI/genericComponents/toasts/toastProvider";

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

  // Unsaved changes state:
  let hasUnsavedChanges: boolean = false;

  // Unsaved changes reactivity:
  $: if (item && name.trim() === item.name && description.trim() === item.description) {
    hasUnsavedChanges = false;
  } else {
    hasUnsavedChanges = true;
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
    // Trim the name and description in the form too:
    name = name.trim();
    description = description.trim();
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
      validationMessage = "Coffee beans with this name already exist.";
      return;
    }
    if (coffeeBeans === "CoffeeBeansNotFound") {
      nameValidationFailed = false;
      addToast("CoffeeBeans not found in the database. Operation aborted.");
      return;
    }
    // Show a toast:
    addToast("Coffee beans modified.");
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
    if (CoffeeBeans.hasValidName({ name }) === "ValidationFailed_NameMustBeAtLeast3CharsLong") {
      nameValidationFailed = true;
      validationMessage = "Name must be at least 3 characters long.";
      return;
    }
    if (name.trim().toLowerCase() === item.name.toLowerCase()) {
      nameValidationFailed === false;
      validationMessage = "";
      return;
    }
    checkCoffeeBeansDuplicate(name).then((value) => {
      switch (value) {
        case "CoffeeBeansNotFound":
          nameValidationFailed = false;
          validationMessage = "";
          break;
        case "Failure_NameAlreadyExist":
          nameValidationFailed = true;
          validationMessage = `Coffee beans "${name.trim()}" already exist.`;
          break;
        default:
          break;
      }
    });
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
        class:unsaved-changes={item.name !== undefined && name.trim() !== item.name}
        on:focusin={handleInputFocusIn}
        on:input={handleInputChange}
        on:keydown={handleEnterKey}
      />
      <p class="mt-2 text-sm text-red-600">{validationMessage}</p>
    </div>
    <div class="my-div mb-5">
      <Textarea
        id="description"
        initialValue={item.description}
        label="Description:"
        name="description"
        placeholder={DESCRIPTION_PH}
        bind:resizeTextarea={bindResizeTextarea}
        bind:this_={textareaDom}
        bind:value={description}
        on:keydown={handleCtrlEnterKey}
      />
    </div>
    <button
      class="button-submit"
      disabled={nameValidationFailed || hasUnsavedChanges === false || CoffeeBeans.hasValidName({ name }) !== true}
      type="submit"
      bind:this={saveButtonDOM}
      on:keydown={handleSaveButtonTabKeydown}
    >
      Save changes
    </button>
  </form>
</Modal>

<style lang="postcss">
  .input-name {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
  }

  .input-name-validation-failed {
    @apply border border-red-500 text-red-900 placeholder-red-700 text-base rounded-lg focus:ring-red-500;
    @apply focus:border-red-500 block w-full p-2.5;
    background-color: #fef2f2;
  }

  .my-div {
    display: inline-block;
    width: 100%;
  }

  .button-submit {
    @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium;
    @apply rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1.25rem;
  }

  .button-submit:disabled {
    @apply bg-gray-300;
  }

  .unsaved-changes {
    border-color: yellowgreen;
    outline-color: yellowgreen;
  }
</style>
