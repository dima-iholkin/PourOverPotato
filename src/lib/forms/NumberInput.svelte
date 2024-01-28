<script lang="ts">
  import Label from "$lib/forms/Label.svelte";

  // Props:

  export let value: number = 0;

  export let labelText: string = "";
  export let nameAttr: string = "";

  export let min: number = 0;
  export let max: number = Number.MAX_SAFE_INTEGER;

  /**
   * Step starting from the min value.
   * Therefore if min = 0 and step = 0.5, the possible values are integers and .5 values.
   */
  export let step: number = 1;

  // Handler functions:

  function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    const key = event.key;
    if (
      (key < "0" || key > "9") &&
      key !== "." &&
      key !== "Backspace" &&
      key !== "Delete" &&
      key !== "ArrowLeft" &&
      key !== "ArrowRight"
    ) {
      event.preventDefault();
      return;
    }
  }

  function handleFocusOut(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    parseValue(event.currentTarget.value);
  }

  function handleMinus() {
    parseValue(value);

    if (value >= min + step) {
      value -= step;
    }
  }

  function handlePlus() {
    parseValue(value);

    if (value <= max - step) {
      value += step;
    }
  }

  // Helpers:

  function parseValue(num: number | string) {
    const parsedNum: number = Number(num);

    if (isNaN(parsedNum)) {
      value = min;
      return;
    }

    if (parsedNum > max) {
      value = max;
      return;
    }

    if (parsedNum < min) {
      value = min;
      return;
    }

    if (parsedNum % step !== 0) {
      value = Math.floor(parsedNum / step) * step;
      return;
    }

    value = parsedNum;
  }
</script>

<div class="container">
  <Label _for={nameAttr}>{labelText}</Label>
  <div class="input-container">
    <button type="button" id="decrement-button" class="minus-button" on:click={handleMinus}>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
      </svg>
    </button>
    <input
      id={nameAttr}
      name={nameAttr}
      type="text"
      bind:value
      on:keydown={handleKeydown}
      on:focusout={handleFocusOut}
    />
    <button type="button" id="increment-button" class="plus-button" on:click={handlePlus}>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 1v16M1 9h16"
        />
      </svg>
    </button>
  </div>
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

  .minus-button {
    @apply bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border;
    @apply border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2;
    @apply focus:outline-none;
  }

  .plus-button {
    @apply bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border;
    @apply border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2;
    @apply focus:outline-none;
  }

  svg {
    @apply w-3 h-3 text-gray-900 dark:text-white;
  }
</style>
