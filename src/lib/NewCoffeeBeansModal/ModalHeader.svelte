<script lang="ts">
  import CloseModalButton from "./CloseModalButton.svelte";
</script>

<div class="my-header">
  <CloseModalButton hidden={true} />
  <h1 class="text-xl text-center font-bold dark:text-white">
    <slot />
  </h1>
  <CloseModalButton on:click />
</div>

<style lang="postcss">
  .my-header {
    display: flex;
    justify-content: space-between;

    @apply p-2;
  }
</style>
