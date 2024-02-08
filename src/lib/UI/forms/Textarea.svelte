<script lang="ts">
  // Props:

  export let id: string = "";
  export let name: string = "";
  export let value: string = "";
  export let placeholder: string = "";
  export let _this: HTMLTextAreaElement | undefined = undefined;
  export let textLinesCount: number = 2;

  if (textLinesCount === 1) {
    textLinesCount = 1.2;
  }
</script>

<textarea
  {id}
  {name}
  {placeholder}
  bind:this={_this}
  bind:value
  on:keydown
  style:height="calc({textLinesCount}rlh + 1rem)"
/>

<style lang="postcss">
  textarea {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500;
    @apply block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;

    width: 100%;
  }
</style>
