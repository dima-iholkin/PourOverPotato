<script lang="ts">
  import Label from "$lib/UI/genericComponents/forms/Label.svelte";

  // Props:
  export let value: boolean = false;
  export let initialValue: boolean | undefined = undefined;
</script>

<div class="container">
  <Label for_="favorite">Favorite:</Label>
  <div class="input-container">
    <label for="favorite" class:unsaved-changes={initialValue !== undefined && initialValue !== value}>
      <input id="favorite" name="favorite" type="checkbox" bind:checked={value} />
      {value ? "❤" : "🤍"}
    </label>
  </div>
</div>

<style lang="postcss">
  .container {
    display: flex;
    align-items: baseline;
  }

  .input-container {
    @apply relative flex items-center max-w-[8rem];
    height: 2.75rem;
  }

  [id="favorite"] {
    position: absolute;
    left: -100vw;
  }

  input {
    @apply bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-base block w-full py-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
    @apply dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400;
    @apply dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
    border-top-color: rgb(209, 213, 219);
    border-top-style: solid;
    border-top-width: 0.8px;
    border-bottom-color: rgb(209, 213, 219);
    border-bottom-style: solid;
    border-bottom-width: 0.8px;
  }

  label {
    border: 2px solid #00000000;
    cursor: pointer;
  }

  label:focus-within {
    border: 2px solid black;
    border-radius: 4px;
  }

  .unsaved-changes {
    border-width: 1px;
    margin: 1px;
    border-color: yellowgreen;
    border-radius: 4px;
  }

  .unsaved-changes:focus-within {
    margin: 0;
    border-color: yellowgreen;
    border-radius: 4px;
  }
</style>
