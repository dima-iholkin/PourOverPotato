<script lang="ts">
  import { devFillDB } from "$lib/database/devData/devFillDB";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  const { MODE } = import.meta.env;

  // Handler functions:

  async function handleInitDevDB() {
    if (MODE === "development") {
      await devFillDB();

      setTimeout(() => location.reload(), 1000);

      alert("Dev DB filled.");
    }
  }
</script>

<PageHeadline>Settings</PageHeadline>

{#if MODE === "development"}
  <button type="button" class="init-db-button" on:click={handleInitDevDB}>Initialize dev DB</button>
{/if}

<style lang="postcss">
  .init-db-button {
    @apply text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4;
    @apply focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2;
    @apply dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400;
    @apply dark:focus:ring-yellow-900;

    margin-top: 1rem;
  }
</style>
