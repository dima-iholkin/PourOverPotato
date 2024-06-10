<script lang="ts">
  import { onMount, tick } from "svelte";
  import Label from "./Label.svelte";

  // Triggers:
  export const resizeTextarea = () => {
    if (this_) {
      resizeOnInput(this_);
    }
  };

  // Props:
  export let id: string = "";
  export let label: string = "";
  export let name: string = "";
  export let placeholder: string = "";
  export let this_: HTMLTextAreaElement | undefined = undefined;
  export let initialValue: string | undefined = undefined;
  export let value: string = "";

  // Reactivity:
  $: {
    value;
    if (this_) {
      const elem = this_;
      tick().then(() => {
        resizeOnInput(elem);
      });
    }
  }

  // Lifecycle:
  onMount(() => {
    if (this_) {
      const elem = this_;
      tick().then(() => resizeOnInput(elem));
    }
  });

  // Helper:
  function resizeOnInput(currentTarget: EventTarget & HTMLTextAreaElement) {
    currentTarget.style.height = "";
    currentTarget.style.height = currentTarget.scrollHeight + "px";
  }
</script>

<div>
  <Label for_={name}>{label}</Label>
  <textarea
    {id}
    {name}
    {placeholder}
    bind:this={this_}
    bind:value
    class:unsaved-changes={initialValue !== undefined && initialValue !== value}
    on:input={(event) => resizeOnInput(event.currentTarget)}
    on:keydown
  />
</div>

<style lang="postcss">
  textarea {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block p-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
    @apply dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;
    width: 100%;
    padding-bottom: 1rem;
    resize: none;
    overflow-y: hidden;
  }

  .unsaved-changes {
    border-color: yellowgreen;
    outline-color: yellowgreen;
  }
</style>
