<script lang="ts">
  import { deleteAllData } from "$lib/database/v1/indexedDB";
  import { routes } from "$lib/domain/routes";
  import DeleteConfirmationModal from "$lib/UI/generic-components/modals/DeleteConfirmationModal.svelte";

  // Bind triggers:

  let bind_setDeleteModalState: (state: "open" | "closed") => void;

  // Handlers:

  async function handleDeleteButtonClick() {
    await deleteAllData();
    window.location.replace(routes.home);
    alert("All data deleted.");
  }
</script>

<div class="container">
  <p>Delete all data:</p>
  <button class="button-delete" type="button" on:click={() => bind_setDeleteModalState("open")}>
    Delete all data
  </button>
</div>

<DeleteConfirmationModal
  onDeleteClick={handleDeleteButtonClick}
  text="Please confirm you want to delete all your data."
  bind:setModalState={bind_setDeleteModalState}
/>

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
