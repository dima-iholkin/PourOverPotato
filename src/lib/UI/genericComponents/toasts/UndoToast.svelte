<script lang="ts">
  import Toast from "./Toast.svelte";

  // Events:
  export let onClickUndo: () => void;

  // UI props:
  export let message: string;
</script>

<Toast {message} on:click>
  <button slot="button" type="button" aria-label="Close" on:click={onClickUndo}>Undo</button>
</Toast>

<style lang="postcss">
  button {
    @apply bg-gray-50 text-gray-900 rounded-lg inline-flex items-center justify-center;
    @apply hover:text-black hover:bg-white;
    @apply focus:ring-2 focus:ring-gray-300;
    @apply dark:text-gray-500 dark:bg-gray-800;
    @apply dark:hover:text-white  dark:hover:bg-gray-700;

    padding: 0.5rem;
  }
</style>
