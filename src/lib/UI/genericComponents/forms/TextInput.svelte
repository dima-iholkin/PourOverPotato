<script lang="ts">
  import Label from "./Label.svelte";

  // Props:
  export let value: string = "";
  export let initialValue: string | undefined = undefined;
  export let labelText: string = "";
  export let nameAttr: string = "";
</script>

<div class="my-container">
  <Label for_={nameAttr}>{labelText}</Label>
  <div class="input-container">
    <input
      id={nameAttr}
      autocomplete="off"
      name={nameAttr}
      type="text"
      bind:value
      class:unsaved-changes={initialValue !== undefined && initialValue !== value}
    />
  </div>
</div>

<style lang="postcss">
  .my-container {
    display: flex;
    align-items: baseline;
  }

  .input-container {
    @apply relative flex items-center;
  }

  input {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block p-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
    max-width: 8rem;
    text-align: right;
  }

  .unsaved-changes {
    border-color: yellowgreen;
    outline-color: yellowgreen;
  }
</style>
