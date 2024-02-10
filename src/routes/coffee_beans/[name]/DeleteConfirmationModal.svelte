<script lang="ts">
  import { deleteCoffeeBeansById, deleteRecipesByCoffeeBeansId } from "$lib/database/v1/indexedDB";
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { routes } from "$lib/domain/routes";
  import MySidebar from "$lib/UI/layout/components/MySidebar.svelte";

  // Expose prop events:

  export let onClose: () => void;

  // Props:

  export let coffeeBeansItem: CoffeeBeans;

  // State:

  let modalDom: Element;

  // Handler functions:

  // Close the modal on Escape key.
  function handleEscKey(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  function handleDocumentClick(event: MouseEvent & { currentTarget: EventTarget & Document }) {
    if (clickOutsideBox(modalDom, event)) {
      onClose();
    }
  }

  function handleDeleteClick() {
    let countDeletedRecipes: number;
    deleteRecipesByCoffeeBeansId(coffeeBeansItem.id)
      .then((count: number) => {
        countDeletedRecipes = count;
        return deleteCoffeeBeansById(coffeeBeansItem.id);
      })
      .then(() => {
        onClose();
        window.location.replace(routes.home);
        alert(`Deleted coffee beans ${coffeeBeansItem.name} and ${countDeletedRecipes} recipes.`);
      });
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

<div class="modal-container">
  <MySidebar asGap />
  <div class="inner-container" bind:this={modalDom}>
    <!-- <ModalHeader on:click={() => onClose()}>Deleting coffee beans...</ModalHeader> -->
    <div class="text-container">
      <p>Please confirm you want to delete these coffee beans.</p>
      <p>The dependent recipes will be deleted too.</p>
    </div>
    <div class="buttons-container">
      <button class="button-delete" type="button" on:click={handleDeleteClick}> Delete </button>
      <button class="button-cancel" type="button" on:click={() => onClose()}> Cancel </button>
    </div>
  </div>
</div>

<style lang="postcss">
  .modal-container {
    @apply fixed inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    z-index: 50;
  }

  .inner-container {
    @apply relative mx-auto shadow-xl rounded-md bg-white max-w-md;

    flex-grow: 1;
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem 2rem 1.5rem 2rem;
  }

  .text-container {
    margin-top: 1rem;
  }

  p {
    text-align: center;
  }

  .buttons-container {
    margin-top: 1rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5rem;
  }

  .button-delete {
    @apply text-red-700 border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-red-800 focus:ring-red-300 focus:ring-4 focus:outline-none;
    @apply dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900;
  }

  .button-cancel {
    @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm;
    @apply px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800;
  }
</style>
