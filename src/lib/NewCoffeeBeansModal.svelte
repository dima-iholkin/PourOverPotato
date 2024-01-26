<script lang="ts">
  // Props:

  import CloseModalButton from "./NewCoffeeBeansModal/CloseModalButton.svelte";
  import ModalHeader from "./NewCoffeeBeansModal/ModalHeader.svelte";

  // State:

  let showModal: boolean = false;

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
      console.log("Hello world");
    }

    // if (event.key === 27) {
    //   document.getElementsByTagName("body")[0].classList.remove("overflow-y-hidden");
    //   let modals = document.getElementsByClassName("modal");
    //   Array.prototype.slice.call(modals).forEach((i) => {
    //     i.style.display = "none";
    //   });
    // }
  }
</script>

<svelte:window on:keydown={handleEscKey} />

<button class="button-add" on:click|preventDefault={() => openModal()}>
  <span class="material-icons md-18"> add </span>
</button>

<div class="modal-container" class:show-modal={showModal}>
  <div class="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
    <ModalHeader on:click={() => closeModal()}>Add new coffee beans</ModalHeader>

    <div class="p-6 pt-0 text-center">
      <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this user?</h3>
      <button on:click={() => closeModal()} class="button-yes"> Yes, I'm sure </button>
      <button on:click={() => closeModal()} class="button-no"> No, cancel </button>
    </div>
  </div>
</div>

<style lang="postcss">
  .modal-container {
    @apply fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4;
  }

  .show-modal {
    display: block;
  }

  button {
    margin-left: 8px;
    margin-right: 4px;
  }

  .button-add {
    @apply bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-700 transition;
  }

  .button-yes {
    @apply text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base;
    @apply inline-flex items-center px-3 py-2.5 text-center mr-2;
  }

  .button-no {
    @apply text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium;
    @apply inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center;
  }
</style>
