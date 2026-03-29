<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet<[]> | undefined;
  }

  const { children }: Props = $props();
</script>

<div class="my-container">
  {@render children?.()}
</div>

<style>
  .my-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    column-gap: 1rem;
    row-gap: 1rem;
    align-items: stretch;
    flex-grow: 0;
    flex-wrap: wrap;
  }
</style>
