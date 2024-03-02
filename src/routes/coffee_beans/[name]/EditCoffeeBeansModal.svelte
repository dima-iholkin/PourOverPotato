<script context="module">
  const DESCRIPTION_PH = "Example: Washed process. Notes: plum, cherry.";
</script>

<script lang="ts">
  import { tick } from "svelte";
  import { goto } from "$app/navigation";
  import { editCoffeeBeans } from "$lib/database/current/indexedDB";
  import { CoffeeBeans, CoffeeBeansEditSubmit } from "$lib/domain/entities/CoffeeBeans";
  import { routes } from "$lib/domain/routes";
  import Label from "$lib/UI/generic-components/forms/Label.svelte";
  import Textarea from "$lib/UI/generic-components/forms/Textarea.svelte";
  import Modal from "$lib/UI/generic-components/modals/Modal.svelte";
  import { addToast } from "$lib/UI/generic-components/toasts/toastProvider";

  // Triggers:

  export const setModalState = (state: "open" | "closed") => {
    setModalState_(state);
  };

  // Entities props:

  export let item: CoffeeBeans;

  // Bind functions:

  let setModalState_: (state: "open" | "closed") => void;

  // Bind DOM elements:

  let inputDom: HTMLInputElement;
  let textareaDom: HTMLTextAreaElement;
  let formDom: HTMLFormElement;

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

    const editedCoffeeBeans: CoffeeBeans = new CoffeeBeans({ name, description }, item.id);

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
      tick().then(() => {
        textareaDom.focus();
        textareaDom.blur();
      });
    }

    if (state === "closed") {
      name = item.name ?? "";
      description = item.description ?? "";
      validationMessage = "";
    }
  }

  function handleInputChange() {
    if (nameValidationFailed) {
      nameValidationFailed = false;
      validationMessage = "";
    }
  }
</script>

<Modal onStateChange={handleModalStateChange} title="Edit coffee beans" bind:setState={setModalState_}>
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
        bind:this_={textareaDom}
        bind:value={description}
        on:keydown={handleCtrlEnterKey}
      />
    </div>
    <button class="button-submit" type="submit">Save</button>
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
