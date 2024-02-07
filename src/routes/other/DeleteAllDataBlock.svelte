<script lang="ts">
  import { deleteAllData } from "$lib/database/v1/indexedDB";
  import { routes } from "$lib/domain/routes";
  import DeleteAllDataConfirmationModal from "./DeleteAllDataConfirmationModal.svelte";

  // UI state:

  let showConfirmationModal: boolean = false;

  // Handler functions:

  function handleDeleteButtonClick() {
    showConfirmationModal = true;
  }

  function handleDeleteConfirmation() {
    deleteAllData().then(() => {
      window.location.replace(routes.home);
      alert("Deleted all data.");
    });
  }
</script>

<div class="container">
  <p>Delete all data:</p>
  <button class="button-delete" on:click={handleDeleteButtonClick} type="button"> Delete all data </button>
</div>

{#if showConfirmationModal}
  <DeleteAllDataConfirmationModal
    onClose={() => (showConfirmationModal = false)}
    onConfirmation={() => handleDeleteConfirmation()}
  />
{/if}

<style lang="postcss">
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .button-delete {
    @apply text-red-700 border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-red-800 focus:ring-red-300 focus:ring-4 focus:outline-none;
    @apply dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900;

    margin-left: 1rem;
  }
</style>
