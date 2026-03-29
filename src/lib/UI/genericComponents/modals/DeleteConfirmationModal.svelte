<script lang="ts">
  import { tick, type Snippet } from "svelte";
  import Modal from "./Modal.svelte";

  interface Props {
    onDeleteClick: () => void;
    children: Snippet<[]> | undefined;
    setModalState: (state: "open" | "closed") => void;
  }

  // Props:
  const {
    children,
    onDeleteClick,
    setModalState = $bindable((state: "open" | "closed") => {
      bindSetModalState(state);
    })
  }: Props = $props();

  // Bind triggers:
  let bindSetModalState: (state: "open" | "closed") => void = $state(() => {});
  let setFocusToModal: () => void = $state(() => {});

  // Bind DOM elements:
  let cancelButtonDOM: HTMLButtonElement;

  // Handlers:

  function handleDeleteClick() {
    bindSetModalState("closed");
    onDeleteClick();
  }

  function handleStateChange(state: "open" | "closed") {
    if (state === "open") {
      tick().then(() => {
        setFocusToModal();
      });
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Tab" && event.shiftKey === false) {
      event.preventDefault();
      setFocusToModal();
    }
  }
</script>

<Modal
  onFocusReverse={() => cancelButtonDOM.focus()}
  onStateChange={handleStateChange}
  title="Confirmation"
  bind:setFocus={setFocusToModal}
  bind:setState={bindSetModalState}
>
  <div class="text-container">
    <p>
      {@render children?.()}
    </p>
  </div>
  <div class="buttons-container">
    <button class="button-delete" type="button" onclick={handleDeleteClick}> Delete </button>
    <button
      class="button-cancel"
      type="button"
      bind:this={cancelButtonDOM}
      onclick={() => bindSetModalState("closed")}
      onkeydown={handleKeydown}
    >
      Cancel
    </button>
  </div>
</Modal>

<style lang="postcss">
  @reference "tailwindcss";

  .text-container {
    margin-top: 1rem;
  }

  p {
    text-align: center;
  }

  .buttons-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5rem;
  }

  .button-delete {
    @apply text-red-700 border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-red-800 focus:ring-red-300 focus:ring-4 focus:outline-none;
  }

  .button-cancel {
    @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm;
    @apply px-5 py-2.5 focus:outline-none;
  }
</style>
