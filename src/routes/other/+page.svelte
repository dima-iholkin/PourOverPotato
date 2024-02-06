<script lang="ts">
  import { devFillDB } from "$lib/database/v1/devData/devFillDB";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  const { MODE } = import.meta.env;

  // Handler functions:

  async function handleInitDevDB() {
    if (MODE === "development") {
      await devFillDB();

      setTimeout(() => {
        location.reload();
        alert("Dev DB filled.");
      }, 1000);
    }
  }
</script>

<svelte:head>
  <title>Other - PourOverPotato app</title>
</svelte:head>

<PageHeadline>Other</PageHeadline>

{#if MODE === "development"}
  <button class="init-db-button" type="button" on:click={handleInitDevDB}>Initialize dev DB</button>
{/if}

<h5>Credits</h5>

<a href="https://www.flaticon.com/free-icons/coffee-beans" style="color: cornflowerblue;" title="coffee beans icons">
  Coffee beans icons created by Freepik - Flaticon
</a>

<style lang="postcss">
  .init-db-button {
    @apply text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4;
    @apply focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2;
    @apply dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400;
    @apply dark:focus:ring-yellow-900;

    margin-top: 1rem;
  }

  h5 {
    @apply text-2xl font-bold tracking-tight text-gray-900 dark:text-white;

    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
