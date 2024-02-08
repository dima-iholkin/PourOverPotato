<script lang="ts">
  import CloseModalButton from "./CloseButton.svelte";
</script>

<div>
  <CloseModalButton hidden={true} />
  <h1>
    <slot />
  </h1>
  <CloseModalButton on:click />
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
