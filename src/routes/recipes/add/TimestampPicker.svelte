<script context="module" lang="ts">
  const TIMESTAMP = "timestamp";
</script>

<script lang="ts">
  import Label from "$lib/UI/utility-components/forms/Label.svelte";

  // Props:

  export let value: string;
</script>

<div class="container">
  <Label _for={TIMESTAMP}>Timestamp:</Label>
  <input id={TIMESTAMP} name={TIMESTAMP} type="datetime-local" bind:value />
</div>

<style lang="postcss">
  .container {
    display: flex;
    align-items: baseline;
  }

  input {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500;
    @apply block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;

    width: auto;
  }
</style>
