<script lang="ts">
  import { formatTimeForInput, parseDateFromInputString } from "$lib/helpers/dateHelpers";
  import Label from "$lib/UI/genericComponents/forms/Label.svelte";

  // Constants:
  const NAME = "roast-date";

  // Props:
  export let dateValue: Date;
  export let initialValue: Date | undefined = undefined;

  // Bind DOM elements:
  let _input: HTMLInputElement;

  $: {
    if (_input) {
      _input.value = dateValue.getTime() > 0 ? formatTimeForInput(dateValue) : "";
    }
  }

  // Handlers:
  function handleChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    // Guard clause:
    if (event.currentTarget.value === "") {
      dateValue = new Date(0);
      return;
    }
    // Normal flow, for a real date:
    const datePart = event.currentTarget.value.split("T")[0];
    const newDateTime = datePart + "T12:00";
    dateValue = parseDateFromInputString(newDateTime);
  }
</script>

<div class="my-container">
  <Label for_={NAME}>Roast date:</Label>
  <input
    id={NAME}
    name={NAME}
    type="datetime-local"
    bind:this={_input}
    class:empty={dateValue.getTime() > 0 === false}
    class:unsaved-changes={initialValue !== undefined && initialValue.getTime() !== dateValue.getTime()}
    on:input={handleChange}
  />
</div>

<style lang="postcss">
  .my-container {
    display: flex;
    align-items: baseline;
  }

  input {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block p-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
  }

  input:focus {
    @apply text-gray-900;
  }

  .empty {
    color: transparent;
  }

  .unsaved-changes {
    border-color: yellowgreen;
    outline-color: yellowgreen;
  }
</style>
