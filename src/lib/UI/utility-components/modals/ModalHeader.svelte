<script lang="ts">
  import CloseModalButton from "./CloseButton.svelte";

  // Props:
  export let title: string;

  // Events:
  export let onClose: () => void;
</script>

<div>
  <CloseModalButton asGap={true} />
  <h1>{title}</h1>
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
</style>
