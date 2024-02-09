<script lang="ts">
  import CloseModalButton from "./CloseButton.svelte";

  // Events:

  export let onClose: () => void;

  // UI props:

  export let title: string | undefined;
</script>

<div>
  <CloseModalButton asGap={true} />
  <h1 class:hidden={title === undefined || title.length === 0}>{title}</h1>
  <CloseModalButton on:click={() => onClose()} />
</div>

<style lang="postcss">
  div {
    display: flex;
    justify-content: space-between;

    /* @apply p-2; */
  }

  h1 {
    @apply text-xl text-center font-bold dark:text-white;
  }

  .hidden {
    display: none;
  }
</style>
