<script context="module" lang="ts">
  const TIMESTAMP = "timestamp";
</script>

<script lang="ts">
  import Label from "$lib/UI/generic-components/forms/Label.svelte";

  // Props:

  export let value: string;
</script>

<!-- eslint-disable max-len -->

<div class="container">
  <Label for_={TIMESTAMP}>Timestamp:</Label>
  <input
    id={TIMESTAMP}
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    name={TIMESTAMP}
    type="datetime-local"
    bind:value
  />
</div>

<style>
  .container {
    display: flex;
    align-items: baseline;
  }
</style>
