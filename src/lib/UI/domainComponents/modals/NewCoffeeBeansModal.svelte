<script module>
  const DESCRIPTION_PH = "Example: Washed process. Notes: plum, cherry.";
</script>

<script lang="ts">
  /* eslint-disable prefer-const */
  import { tick } from "svelte";
  import { addCoffeeBeans, checkCoffeeBeansDuplicate } from "$lib/database/coffeeBeansAPI";
  import { CoffeeBeans, CoffeeBeansCreateSubmit } from "$lib/domain/entities/CoffeeBeans";
  import Label from "$lib/UI/genericComponents/forms/Label.svelte";
  import Textarea from "$lib/UI/genericComponents/forms/Textarea.svelte";
  import Modal from "$lib/UI/genericComponents/modals/Modal.svelte";
  import { addToast } from "$lib/UI/genericComponents/toasts/toastProvider";
  import { getModalCloseButtonDOMContext } from "$lib/UI/genericComponents/modals/components/CloseButtonDOMContext";

  interface Props {
    /**
     * Subscribe to an event of `CoffeeBeans` creation. */
    onCoffeeBeansAdded?: (coffeeBeans: CoffeeBeans) => void;
    /**
     * Set `true` to show the modal.
     */
    isShown: boolean;
  }

  // Props:
  let { onCoffeeBeansAdded, isShown }: Props = $props();

  // Form fields state:
  let name: string = $state("");
  let description: string = $state("");

  // Validation state:
  let validationMessage: string = $state("");
  let nameValidationFailed: boolean = $derived(validationMessage === "" ? true : false);

  /**
   * Validate `name` field on every input. */
  function handleInput_ValidateNameField() {
    if (CoffeeBeans.hasValidName({ name }) === "ValidationFailed_NameMustBeAtLeast3CharsLong") {
      validationMessage = "Name must be at least 3 characters long.";
      return;
    }
    checkCoffeeBeansDuplicate(name).then((value) => {
      switch (value) {
        case "CoffeeBeansNotFound":
          validationMessage = "";
          break;
        case "Failure_NameAlreadyExist":
          validationMessage = `Coffee beans "${name.trim()}" already exist.`;
          break;
        default:
          break;
      }
    });
  }

  // Form submit actions:
  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    // Trim the name and description in the form too:
    name = name.trim();
    description = description.trim();
    // Validate and save the new coffee beans:
    const coffeeBeansSubmit: CoffeeBeansCreateSubmit | "ValidationFailed_NameMustBeAtLeast3CharsLong" =
      CoffeeBeansCreateSubmit.create({ name, description });
    // Guard clause:
    if (coffeeBeansSubmit === "ValidationFailed_NameMustBeAtLeast3CharsLong") {
      validationMessage = "Name must be at least 3 characters long.";
      return;
    }
    // Save the new CoffeeBeans item:
    const coffeeBeans: CoffeeBeans | "Failure_NameAlreadyExist" | "DatabaseError" =
      await addCoffeeBeans(coffeeBeansSubmit);
    // Guard clauses:
    if (coffeeBeans === "Failure_NameAlreadyExist") {
      validationMessage = "Coffee beans with this name already exist.";
      return;
    }
    // Show a toast:
    addToast(`Coffee beans "${coffeeBeans.name}" created.`);
    // Return the new Coffee Beans entity to the "Add recipe" page:
    onCoffeeBeansAdded?.(coffeeBeans);
    // Clear the modal state:
    isShown = false;
    name = "";
    description = "";
  }

  // Refresh the modal UI, every time it's reopened:
  $effect(() => {
    if (isShown) {
      // name = "";
      // description = "";
      // validationMessage = "";
      tick().then(() => {
        bindResizeTextarea?.();
        inputDom.focus();
      });
    }
  });

  // ----- Inner logic: -----

  // Bind triggers:
  let bindResizeTextarea: (() => void) | undefined = $state();

  // DOM pointers:
  let formDom: HTMLFormElement;
  let inputDom: HTMLInputElement;
  let saveButtonDOM: HTMLButtonElement;
  // svelte-ignore non_reactive_update
  let textareaDom: HTMLTextAreaElement;

  /**
   * Fix UI on `name` field `focusin`. */
  function handleFocusIn_NameField(event: FocusEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    const textLength = event.currentTarget.value.length;
    inputDom.setSelectionRange(textLength, textLength);
  }

  // Keyboard command handlers:
  function handleKeypress_CtrlEnter(event: KeyboardEvent) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      formDom.requestSubmit();
    }
  }
  function handleKeypress_Enter(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    if (event.key === "Enter") {
      event.preventDefault();
      textareaDom.focus();
    }
  }
  function handleKeydown_Tab_OnSaveButton(event: KeyboardEvent) {
    if (event.key === "Tab" && event.shiftKey === false) {
      event.preventDefault();
      getModalCloseButtonDOMContext()?.focus();
    }
  }
</script>

<Modal onFocusReverse={() => saveButtonDOM.focus()} title="Add coffee beans" showModal={isShown}>
  <form class="mx-auto" bind:this={formDom} onsubmit={handleSubmit}>
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
        onfocusin={handleFocusIn_NameField}
        oninput={handleInput_ValidateNameField}
        onkeydown={handleKeypress_Enter}
      />
      <p class="mt-2 text-sm text-red-600">{validationMessage}</p>
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
        onkeydown={handleKeypress_CtrlEnter}
      />
    </div>
    <button
      class="button-submit"
      disabled={nameValidationFailed || CoffeeBeans.hasValidName({ name }) !== true}
      type="submit"
      bind:this={saveButtonDOM}
      onkeydown={handleKeydown_Tab_OnSaveButton}
    >
      Save
    </button>
  </form>
</Modal>

<style lang="postcss">
  @reference "tailwindcss";

  .input-name {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
  }

  .input-name-validation-failed {
    @apply border border-red-500 text-red-900 placeholder-red-700 text-base rounded-lg block w-full p-2.5;
    @apply focus:ring-red-500 focus:border-red-500;
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
  }

  .button-submit:disabled {
    @apply bg-gray-300;
  }
</style>
