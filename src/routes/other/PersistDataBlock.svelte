<script lang="ts">
  import { onMount } from "svelte";

  // UI state:

  let storageIsPersistent: boolean | undefined = undefined;

  // Lifecycle:

  onMount(async () => {
    storageIsPersistent = await navigator.storage.persisted();
  });

  // Handlers:

  async function handlePersistButtonClick() {
    await navigator.storage.persist();
    location.reload();
  }
</script>

<div class="container">
  <p style="margin-right: 0.5rem;">Persistent storage enabled:</p>
  <div class="container-row-nowrap" style="">
    {#if storageIsPersistent === undefined}
      <p>loading...</p>
    {:else}
      <p class={storageIsPersistent ? "text-green-500" : "text-red-700"} style="font-weight: bold;">
        {storageIsPersistent}
      </p>
      {#if storageIsPersistent === false}
        <button type="button" on:click={handlePersistButtonClick}> Enable </button>
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
