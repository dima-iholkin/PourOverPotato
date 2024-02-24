<script lang="ts">
  import Label from "./Label.svelte";

  // Props:

  export let id: string = "";
  export let label: string = "";
  export let name: string = "";
  export let placeholder: string = "";
  export let textLinesCount: number = 3;
  export let this_: HTMLTextAreaElement | undefined = undefined;
  export let value: string = "";

  // Reactivity:

  if (textLinesCount === 1) {
    textLinesCount = 1.2;
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
    on:keydown
    style:height="calc({textLinesCount}rlh + 1.5rem)"
  />
</div>

<style lang="postcss">
  textarea {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block p-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
    @apply dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;

    width: 100%;
  }
</style>
