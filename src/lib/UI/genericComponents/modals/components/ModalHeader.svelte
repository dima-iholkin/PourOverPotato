<script lang="ts">
  import CloseModalButton from "./CloseButton.svelte";

  // Events:
  export let onClose: () => void;
  export let onFocusReverse: (() => void) | undefined = undefined;

  // Triggers:
  export const setFocus = () => {
    setFocusToCloseModalButton();
  };

  // UI props:
  export let title: string | undefined;

  // Bind triggers:
  let setFocusToCloseModalButton: () => void;
</script>

<div>
  <CloseModalButton asGap={true} />
  <h1 class:hidden={title === undefined || title.length === 0}>{title}</h1>
  <CloseModalButton {onFocusReverse} bind:setFocus={setFocusToCloseModalButton} on:click={() => onClose()} />
</div>

<style lang="postcss">
  div {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    @apply text-xl text-center font-bold;
  }

  .hidden {
    display: none;
  }
</style>
