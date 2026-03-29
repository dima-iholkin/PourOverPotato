<script lang="ts">
  interface Props {
    buttonText: string;
    onclick: (event: MouseEvent) => void
  }

  // Props:
  const { buttonText, onclick }: Props = $props();
</script>

<li>
  <button type="button" onclick={onclick}>{buttonText}</button>
</li>

<style lang="postcss">
  @reference "tailwindcss";

  button {
    /* Layout: */
    @apply block px-4 py-2;
    width: 100%;
    text-align: left;
    /* Colors: */
    @apply text-red-600 hover:text-red-400 hover:bg-gray-100;
  }
</style>
