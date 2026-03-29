<script lang="ts">
  import { onMount, tick } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { anyCoffeeBeans } from "$lib/database/coffeeBeansAPI";
  import { routes } from "$lib/domain/constants/routes";
  import Modal from "$lib/UI/genericComponents/modals/Modal.svelte";
  import { addToast } from "$lib/UI/genericComponents/toasts/toastProvider";
  import BackupYourDataModal from "./BackupYourDataModal.svelte";

  // Constants:
  const PERSISTENT_STORAGE_KEY = "persistentStorageCheckDate";

  let showBackupYourDataModal: boolean = $state(false);

  // Bind triggers:
  let bindSetModalState: (state: "open" | "closed") => void = $state(() => {});
  let setFocusToModal: () => void = $state(() => {});

  // Pointers to DOM elements:
  let cancelButtonDOM: HTMLButtonElement;
  let enableButtonDOM: HTMLButtonElement;

  // Lifecycle:
  onMount(async () => {
    if (
      (await navigator.storage.persisted()) === false &&
      (localStorage.getItem(PERSISTENT_STORAGE_KEY) === null ||
        localStorage.getItem(PERSISTENT_STORAGE_KEY) !== new Date().toDateString()) &&
      (await anyCoffeeBeans())
    ) {
      localStorage.setItem(PERSISTENT_STORAGE_KEY, new Date().toDateString());
      bindSetModalState("open");
    }
  });

  // Entity handler:
  async function handlePersistButtonClick() {
    const result: boolean = await navigator.storage.persist();
    if (result == false) {
      alert(
        "Sorry, your browser refused to enable persistent storage. " +
          "It means your data is still at risk of being evicted at any moment by the browser. " +
          "Try using Firefox browser, it seems to be the only browser to allow enabling persistent storage always."
      );
      showBackupYourDataModal = true;
      bindSetModalState("closed");
    } else {
      bindSetModalState("closed");
      addToast("Persistent storage enabled.");
      const route = page.url.pathname;
      goto(routes.home).then(() => goto(route));
    }
  }

  // UI handlers:

  function handleVisibilityChange(state: "open" | "closed") {
    if (state === "open") {
      tick().then(() => {
        enableButtonDOM.focus();
      });
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Tab" && event.shiftKey === false) {
      event.preventDefault();
      setFocusToModal();
    }
  }
</script>

<Modal
  onFocusReverse={() => cancelButtonDOM.focus()}
  onStateChange={handleVisibilityChange}
  title="Persistent storage not enabled"
  bind:setFocus={setFocusToModal}
  bind:setState={bindSetModalState}
>
  <div class="text-container">
    <p>
      Please try turning persistent storage ON in your browser, it will make your data relatively safe from a browser
      eviction.
    </p>
  </div>
  <div class="buttons-container">
    <button class="enable" type="button" bind:this={enableButtonDOM} onclick={handlePersistButtonClick}>
      Enable persistent storage
    </button>
    <button
      class="cancel"
      type="button"
      bind:this={cancelButtonDOM}
      onclick={() => bindSetModalState("closed")}
      onkeydown={handleKeydown}
    >
      Cancel
    </button>
  </div>
</Modal>

{#if showBackupYourDataModal}
  <BackupYourDataModal />
{/if}

<style lang="postcss">
  @reference "tailwindcss";

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

  button.cancel {
    @apply text-gray-500 border border-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-gray-400 focus:ring-gray-300 focus:ring-4 focus:outline-none;
  }
</style>
