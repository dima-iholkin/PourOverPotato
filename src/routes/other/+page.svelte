<script lang="ts">
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import DeleteAllDataBlock from "./DeleteAllDataBlock.svelte";
</script>

<svelte:head>
  <title>Other - PourOverPotato app</title>
</svelte:head>

<PageHeadline>Other</PageHeadline>

<h5>Manage your data</h5>

<DeleteAllDataBlock />

<h5>Credits</h5>

<p style="display: inline;">Coffee beans icon</p>
<a href="https://www.flaticon.com/free-icons/coffee-beans" style="color: cornflowerblue;" title="coffee beans icons">
  created by Freepik - Flaticon
</a>

<style lang="postcss">
  h5 {
    @apply text-2xl font-bold tracking-tight text-gray-900 dark:text-white;

    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }
</style>
