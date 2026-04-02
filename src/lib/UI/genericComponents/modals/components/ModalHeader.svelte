<script lang="ts">
  /* eslint-disable prefer-const */
  import CloseModalButton from "./CloseButton.svelte";

  interface Props {
    onClose?: () => void;
    onFocusReverse?: () => void;
    setFocus?: () => void;
    title: string | undefined;
  }

  let { onClose, onFocusReverse, setFocus = $bindable(() => setFocusToCloseModalButton?.()), title }: Props = $props();

  // Bind triggers:
  let setFocusToCloseModalButton: (() => void) | undefined = $state(() => {});
</script>

<div>
  <CloseModalButton asGap={true} />
  <h1 class:hidden={title === undefined || title.length === 0}>{title}</h1>
  <CloseModalButton {onFocusReverse} bind:setFocus={setFocusToCloseModalButton} onclick={() => onClose?.()} />
</div>

<style lang="postcss">
  @reference "tailwindcss";

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
