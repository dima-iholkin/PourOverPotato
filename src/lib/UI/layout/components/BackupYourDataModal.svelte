<script lang="ts">
  import { onMount, tick } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { exportAllData } from "$lib/database/dataExportImportAPI/exportDataAPI";
  import { routes } from "$lib/domain/constants/routes";
  import Modal from "$lib/UI/genericComponents/modals/Modal.svelte";
  import { addToast } from "$lib/UI/genericComponents/toasts/toastProvider";

  // Bind triggers:
  let bindSetModalState: (state: "open" | "closed") => void;
  let setFocusToModal: () => void;

  // Bind DOM elements:
  let cancelButtonDOM: HTMLButtonElement;
  let enableButtonDOM: HTMLButtonElement;

  // Lifecycle:
  onMount(() => bindSetModalState("open"));

  // Entity handler:
  async function handleExportMyDataClick() {
    await handleExportButtonClick();
    bindSetModalState("closed");
    addToast("Backup saved.");
    const route = $page.url.pathname;
    goto(routes.home).then(() => goto(route));
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

  // Helpers:
  async function handleExportButtonClick() {
    // Create the DOM element:
    const a = document.createElement("a");
    const data: Blob = await exportAllData();
    a.href = URL.createObjectURL(data);
    // Generate a file name:
    const date = new Date();
    const monthNumber = date.getMonth() + 1;
    const monthString = monthNumber.toString().padStart(2, "0");
    const dateNumber = date.getDate();
    const dateString = dateNumber.toString().padStart(2, "0");
    a.setAttribute("download", `PourOverPotato-${date.getFullYear()}_${monthString}_${dateString}.json`);
    // Click the DOM element:
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
</script>

<Modal
  onFocusReverse={() => cancelButtonDOM.focus()}
  onStateChange={handleVisibilityChange}
  title="Backup your data"
  bind:setFocus={setFocusToModal}
  bind:setState={bindSetModalState}
>
  <div class="text-container">
    <p>Please backup your data in case web browser decides to free up space and wipe your data.</p>
  </div>
  <div class="buttons-container">
    <button class="enable" type="button" bind:this={enableButtonDOM} on:click={handleExportMyDataClick}>
      Export my data
    </button>
    <button
      class="cancel"
      type="button"
      bind:this={cancelButtonDOM}
      on:click={() => bindSetModalState("closed")}
      on:keydown={handleKeydown}
    >
      Cancel
    </button>
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

  button.cancel {
    @apply text-gray-500 border border-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-gray-400 focus:ring-gray-300 focus:ring-4 focus:outline-none;
  }
</style>
