<script lang="ts">
  export let daysSinceRoast: number | undefined;
  export let onClear: () => void;
</script>

<div class="text-gray-900">
  {#if daysSinceRoast === undefined || Number.isFinite(daysSinceRoast) === false}
    <div style="visibility: hidden;">
      <p>xx days since roast</p>
      <button on:click|preventDefault={() => onClear()}>clear</button>
    </div>
  {:else if daysSinceRoast === 1}
    <p>1 day since roast</p>
    <button on:click|preventDefault={() => onClear()}>clear</button>
  {:else}
    <p>{daysSinceRoast} days since roast</p>
    <button on:click|preventDefault={() => onClear()}>clear</button>
  {/if}
</div>

<style lang="postcss">
  div {
    display: flex;
    align-items: center;
  }

  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  button {
    @apply py-1 px-2 rounded;
    border-color: gainsboro;
    border-width: 0.8px;
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>
