<script lang="ts">
  import Modal from "$lib/UI/generic-components/modals/Modal.svelte";

  // Events:

  export let onDeleteClick: () => void;

  // Triggers:

  export const setModalState = (state: "open" | "closed") => {
    bind_setModalState(state);
  };

  // Bind functions:

  let bind_setModalState: (state: "open" | "closed") => void;

  // Handlers:

  function handleDeleteClick() {
    bind_setModalState("closed");
    onDeleteClick();
  }
</script>

<Modal title="Confirmation" bind:setState={bind_setModalState}>
  <div class="text-container">
    <p>
      <slot />
    </p>
  </div>
  <div class="buttons-container">
    <button class="button-delete" type="button" on:click={handleDeleteClick}> Delete </button>
    <button class="button-cancel" type="button" on:click={() => bind_setModalState("closed")}> Cancel </button>
  </div>
</Modal>

<style lang="postcss">
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
