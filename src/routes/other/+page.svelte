<script lang="ts">
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import DeleteAllDataBlock from "./DeleteAllDataBlock.svelte";
</script>

<svelte:head>
  <title>Other - PourOverPotato app</title>
</svelte:head>

<PageHeadline>Other</PageHeadline>

<h5>Credits</h5>

<a href="https://www.flaticon.com/free-icons/coffee-beans" style="color: cornflowerblue;" title="coffee beans icons">
  Coffee beans icons created by Freepik - Flaticon
</a>

<h5>Manage your data</h5>

<DeleteAllDataBlock />

<style lang="postcss">
  h5 {
    @apply text-2xl font-bold tracking-tight text-gray-900 dark:text-white;

    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }
</style>
