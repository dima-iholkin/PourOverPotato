<script context="module" lang="ts">
  const TIMESTAMP = "timestamp";
</script>

<script lang="ts">
  import Label from "$lib/UI/genericComponents/forms/Label.svelte";

  // Props:
  export let value: string;
  export let initialValue: string | undefined = undefined;
</script>

<!-- eslint-disable max-len -->
<div class="container">
  <Label for_={TIMESTAMP}>Timestamp:</Label>
  <input
    id={TIMESTAMP}
    class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
    name={TIMESTAMP}
    type="datetime-local"
    bind:value
    class:unsaved-changes={initialValue !== undefined && initialValue !== value}
  />
</div>

<style>
  .container {
    display: flex;
    align-items: baseline;
  }

  .unsaved-changes {
    border-color: yellowgreen;
    outline-color: yellowgreen;
  }
</style>
