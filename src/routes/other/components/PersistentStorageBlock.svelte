<script lang="ts">
  import { onMount } from "svelte";
  import { addToast } from "$lib/UI/genericComponents/toasts/toastProvider";

  // UI state:
  let storageIsPersistent: boolean | undefined = undefined;

  // Lifecycle:
  onMount(async () => {
    storageIsPersistent = await navigator.storage.persisted();
  });

  // Handler:
  async function handlePersistButtonClick() {
    const result: boolean = await navigator.storage.persist();
    if (result == false) {
      alert(
        "Sorry, your browser refused to enable persistent storage.\n" +
          "This means your data is still at risk of being evicted by the browser at any moment.\n" +
          "Try using another browser like Firefox, it seems to allow enabling persistent storage always."
      );
    } else {
      addToast("Persistent storage enabled.");
      storageIsPersistent = true;
    }
  }
</script>

<div class="container">
  <p style="margin-right: 0.5rem;">Persistent storage:</p>
  <div class="container-row-nowrap" style="">
    {#if storageIsPersistent === undefined}
      <p>loading...</p>
    {:else}
      <p class={storageIsPersistent ? "text-green-500" : "text-red-700"} style="font-weight: bold;">
        {storageIsPersistent ? "enabled" : "not enabled"}
      </p>
      {#if storageIsPersistent === false}
        <button type="button" on:click={handlePersistButtonClick}> Enable persistent storage </button>
      {/if}
    {/if}
  </div>
</div>

<style lang="postcss">
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .container-row-nowrap {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  button {
    @apply text-green-500 border border-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-green-400 focus:ring-green-300 focus:ring-4 focus:outline-none;
    margin-left: 1rem;
  }
</style>
