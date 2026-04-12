<script lang="ts">
  import { onMount } from "svelte";
  /* eslint-disable prefer-const */
  import CloseModalButton from "./CloseButton.svelte";
  import { setModalCloseButtonDOMContext } from "./CloseButtonDOMContext";

  interface Props {
    onClose?: () => void;
    onFocusReverse?: () => void;
    title: string | undefined;
  }

  // Props:
  let { onClose, onFocusReverse, title }: Props = $props();

  // DOM pointer:
  let buttonDOM: ReturnType<typeof CloseModalButton> | undefined = $state();

  onMount(() => {
    setModalCloseButtonDOMContext(buttonDOM);
  });
</script>

<div>
  <CloseModalButton asGap={true} />
  <h1 class:hidden={title === undefined || title.length === 0}>{title}</h1>
  <CloseModalButton {onFocusReverse} bind:this={buttonDOM} onclick={() => onClose?.()} />
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
