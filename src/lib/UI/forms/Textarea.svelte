<script lang="ts">
  // Props:

  export let id: string = "";
  export let name: string = "";
  export let value: string = "";
  export let placeholder: string = "";
</script>

<textarea {id} {name} {placeholder} bind:value />

<style lang="postcss">
  textarea {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500;
    @apply block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500;

    width: 100%;
  }
</style>
