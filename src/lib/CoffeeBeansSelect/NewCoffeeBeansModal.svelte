<script lang="ts">
  // Props:

  import CloseButton from "./CloseButton.svelte";
  import Header from "./Header.svelte";

  // State:

  let showModal: boolean = false;

  let name: string = "";
  let description: string = "";

  // Handler functions:

  function openModal() {
    console.log("Open modal");
    showModal = true;
    // document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
  }

  function closeModal() {
    showModal = false;
    // document.getElementsByTagName("body")[0].classList.remove("overflow-y-hidden");
  }

  // Close all modals when press ESC
  function handleEscKey(event: KeyboardEvent) {
    if (showModal && event.key === "Escape") {
      showModal = false;
    }
  }

  function handleSubmit(event: SubmitEvent) {
    // Validate and save the new coffee beans.

    // Return the new Coffee Beans entity to the "Add recipe" page.
  }
</script>

<svelte:window on:keydown={handleEscKey} />

<button class="button-add" on:click|preventDefault={() => openModal()}>
  <span class="material-icons md-18"> add </span>
</button>

<div class="modal-container" class:show-modal={showModal}>
  <div class="inner-container">
    <Header on:click={() => closeModal()}>Add new coffee beans</Header>

    <form class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="name">Coffee beans name</label>
        <input
          type="text"
          id="name"
          name="name"
          class="input-name"
          placeholder="Rwanda Mabanza"
          required
          bind:value={name}
        />
      </div>
      <div class="my-div mb-5">
        <label for="description"> Description </label>
        <textarea
          id="description"
          class="textarea-description"
          placeholder="Washed process. Notes: plum, cherry."
          bind:value={description}
        />
      </div>
      <button type="submit" class="button-submit" on:submit|preventDefault={handleSubmit}>Save</button>
    </form>
  </div>
</div>

<style lang="postcss">
  .modal-container {
    @apply fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4;
  }

  .show-modal {
    display: block;
  }

  .inner-container {
    @apply relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md;
  }

  button {
    margin-left: 8px;
    margin-right: 4px;
  }

  .button-add {
    @apply bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-700 transition;
  }

  .input-name {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500;
    @apply block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;
  }

  label {
    @apply block mb-2 text-sm font-medium text-gray-900 dark:text-white;
  }

  .textarea-description {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500;
    @apply block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;
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
