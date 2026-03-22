<script lang="ts">
  import Toast from "./Toast.svelte";

  const {
    onClickUndo = $bindable(),
    message,
    onclick
  }: { onClickUndo: () => void; message: string; onclick: () => void } = $props();
</script>

<Toast {message} onclick={() => onclick()}>
  {#snippet button()}
    <button  type="button" aria-label="Close" onclick={() => onClickUndo()}>Undo</button>
  {/snippet}
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
