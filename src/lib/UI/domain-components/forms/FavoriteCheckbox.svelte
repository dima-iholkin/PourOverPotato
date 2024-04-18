<script lang="ts">
  import Label from "../../generic-components/forms/Label.svelte";

  // Props:

  export let value: boolean = false;

  // Handlers:

  function handleClick() {
    if (value === true) {
      value = false;
    } else {
      value = true;
    }
  }
</script>

<div class="container">
  <Label for_="favorite">Favorite:</Label>
  <div class="input-container">
    <input id="favorite" name="favorite" type="checkbox" />
    <label id="favorite-checkbox" for="favorite" on:click={handleClick}>{value ? "❤" : "🤍"}</label>
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

  #favorite-checkbox {
    cursor: pointer;
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
</style>
