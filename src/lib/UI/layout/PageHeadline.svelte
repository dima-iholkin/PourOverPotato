<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet<[]> | undefined;
  }

  const { children }: Props = $props();
</script>

<h1>
  {@render children?.()}
</h1>

<style lang="postcss">
  @reference "tailwindcss";

  h1 {
    /* Layout: */
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    /* Font: */
    @apply text-2xl font-bold tracking-tight;

    /* Colors: */
    @apply text-gray-900;
  }
</style>
