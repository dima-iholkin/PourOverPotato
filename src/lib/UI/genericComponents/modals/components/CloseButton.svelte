<script lang="ts">
  /* eslint-disable prefer-const */
  interface Props {
    onFocusReverse?: () => void;
    setFocus?: () => void;
    asGap?: boolean;
    onclick?: (event: MouseEvent) => void;
  }

  let { onFocusReverse, setFocus = $bindable(() => buttonDOM?.focus()), asGap = false, onclick }: Props = $props();

  // Pointer to a DOM element:
  let buttonDOM: HTMLButtonElement | undefined;

  // Handler:
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Tab" && event.shiftKey && onFocusReverse) {
      event.preventDefault();
      onFocusReverse();
    }
  }
</script>

<!-- eslint-disable max-len -->
<button
  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
  type="button"
  bind:this={buttonDOM}
  class:as-gap={asGap}
  {onclick}
  onkeydown={handleKeydown}
  aria-label="Close modal"
>
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      clip-rule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      fill-rule="evenodd"
    ></path>
  </svg>
</button>

<style>
  .as-gap {
    visibility: hidden;
  }
</style>
