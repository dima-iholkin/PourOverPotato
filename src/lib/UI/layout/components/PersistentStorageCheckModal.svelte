<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { anyCoffeeBeansSaved } from "$lib/database/current/indexedDB";
  import { routes } from "$lib/domain/routes";
  import Modal from "$lib/UI/generic-components/modals/Modal.svelte";
  import { addToast } from "$lib/UI/generic-components/toasts/toastProvider";

  // Constants:

  const PERSISTENT_STORAGE_KEY = "persistentStorageCheckDate";

  // Bind triggers:

  let bindSetModalState: (state: "open" | "closed") => void;

  // Lifecycle:

  onMount(async () => {
    if (
      (await navigator.storage.persisted()) === false &&
      (localStorage.getItem(PERSISTENT_STORAGE_KEY) === null ||
        localStorage.getItem(PERSISTENT_STORAGE_KEY) !== new Date().toDateString()) &&
      (await anyCoffeeBeansSaved())
    ) {
      localStorage.setItem(PERSISTENT_STORAGE_KEY, new Date().toDateString());
      bindSetModalState("open");
    }
  });

  // Handlers:

  async function handlePersistButtonClick() {
    const result: boolean = await navigator.storage.persist();
    if (result == false) {
      alert(
        "Sorry, your browser refused to enable persistent storage. " +
          "It means your data is still at risk of being evicted at any moment by the browser. " +
          "Try using Firefox browser, it seems to be the only browser to allow enabling persistent storage always."
      );
    } else {
      bindSetModalState("closed");
      addToast("Persistent storage enabled.");
      const route = $page.url.pathname;
      goto(routes.home).then(() => goto(route));
    }
  }
</script>

<Modal title="Persistent storage not enabled" bind:setState={bindSetModalState}>
  <div class="text-container">
    <p>
      Please try turning persistent storage ON in your browser, it will make your data relatively safe from a browser
      eviction.
    </p>
  </div>
  <div class="buttons-container">
    <button class="enable" type="button" on:click={handlePersistButtonClick}> Enable persistent storage </button>
    <button class="cancel" type="button" on:click={() => bindSetModalState("closed")}> Cancel </button>
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
    gap: 2rem;
  }

  button.enable {
    @apply text-green-500 border border-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-green-400 focus:ring-green-300 focus:ring-4 focus:outline-none;
  }

  button.cancel{
    @apply text-gray-500 border border-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-gray-400 focus:ring-gray-300 focus:ring-4 focus:outline-none;
  }
</style>
