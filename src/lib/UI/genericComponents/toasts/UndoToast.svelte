<script lang="ts">
  import Toast from "./Toast.svelte";

  const { onClickUndo = $bindable(), message }: { onClickUndo: () => void; message: string } = $props();
</script>

<Toast {message} on:click>
  <button slot="button" type="button" aria-label="Close" on:click={onClickUndo}>Undo</button>
</Toast>

<style lang="postcss">
  @reference "tailwindcss";

  button {
    @apply bg-gray-50 text-gray-900 rounded-lg inline-flex items-center justify-center;
    @apply hover:text-black hover:bg-white;
    @apply focus:ring-2 focus:ring-gray-300;
    padding: 0.5rem;
  }
</style>
