<script lang="ts">
  import { onMount } from "svelte";
  import Label from "./Label.svelte";

  // Props:

  export let id: string = "";
  export let label: string = "";
  export let name: string = "";
  export let placeholder: string = "";
  export let this_: HTMLTextAreaElement | undefined = undefined;
  export let value: string = "";

  // Lifecycle:

  onMount(() => {
    if (this_) {
      resizeOnInput(this_);
    }
  });

  // Helpers:

  function resizeOnInput(currentTarget: EventTarget & HTMLTextAreaElement) {
    currentTarget.style.height = "";
    // console.log("scrollHeight before resize: " + currentTarget.scrollHeight);
    currentTarget.style.height = currentTarget.scrollHeight + "px";
    // console.log("scrollHeight after resize: " + currentTarget.scrollHeight);
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
    on:focus={(event) => resizeOnInput(event.currentTarget)}
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

    padding-bottom: 2rem;
    resize: none;
    overflow-y: hidden;

    /* box-sizing: content-box; */

    /* min-height: 90px; */
  }
</style>
