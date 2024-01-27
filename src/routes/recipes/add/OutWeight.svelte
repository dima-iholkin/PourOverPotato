<script context="module">
  const OUTPUT_WEIGHT = "output-weight";
</script>

<script lang="ts">
  import Label from "$lib/forms/Label.svelte";

  // Props:

  export let value: number = 0;
</script>

<div class="container">
  <Label _for={OUTPUT_WEIGHT}>Output weight:</Label>
  <div class="input-container">
    <input name={OUTPUT_WEIGHT} id={OUTPUT_WEIGHT} type="number" min="0" step="5" bind:value />
  </div>
  <label for={OUTPUT_WEIGHT}>g</label>
</div>

<style lang="postcss">
  .container {
    display: flex;
    align-items: baseline;
  }

  .input-container {
    @apply relative flex items-center max-w-[8rem];
  }

  input {
    @apply bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500;
    @apply focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400;
    @apply dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;

    border-top-color: rgb(209, 213, 219);
    border-top-style: solid;
    border-top-width: 0.8px;
    border-bottom-color: rgb(209, 213, 219);
    border-bottom-style: solid;
    border-bottom-width: 0.8px;
  }
</style>
