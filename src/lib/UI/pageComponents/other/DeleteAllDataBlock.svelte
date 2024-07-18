<script lang="ts">
  import { deleteDB } from "$lib/database/manageData/manageData";
  import DeleteConfirmationModal from "$lib/UI/genericComponents/modals/DeleteConfirmationModal.svelte";
  import { addToast } from "$lib/UI/genericComponents/toasts/toastProvider";

  // Bind triggers:
  let bind_setDeleteModalState: (state: "open" | "closed") => void;

  // Handler:
  async function handleDeleteButtonClick() {
    await deleteDB();
    addToast("All data deleted.");
  }
</script>

<div class="container">
  <p>Delete all data:</p>
  <button class="button-delete" type="button" on:click={() => bind_setDeleteModalState("open")}>
    Delete all data
  </button>
</div>

<DeleteConfirmationModal onDeleteClick={handleDeleteButtonClick} bind:setModalState={bind_setDeleteModalState}>
  Please confirm you want to delete all your data.
</DeleteConfirmationModal>

<style lang="postcss">
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .button-delete {
    @apply text-red-700 border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-red-800 focus:ring-red-300 focus:ring-4 focus:outline-none;
    margin-left: 1rem;
  }
</style>
