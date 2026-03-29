<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet<[]>;
  }

  const { children }: Props = $props();
</script>

<div class="card-flex-row">
  {@render children?.()}
</div>

<style>
  .card-flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
</style>
