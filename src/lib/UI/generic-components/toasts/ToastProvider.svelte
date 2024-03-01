<script lang="ts">
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import Toast from "$lib/UI/generic-components/toasts/Toast.svelte";
  import UndoToast from "./UndoToast.svelte";

  interface ToastData {
    message: string;
    timeout: number;
    timestamp: number;
    onClickUndo: (() => void) | undefined;
    onUndoIgnored: (() => void) | undefined;
  }

  // UI state:

  let toasts: ToastData[] = [];

  // Lifecycle:

  onMount(() => {
    // @ts-ignore
    document.addEventListener(
      "addToast",
      (
        event: CustomEvent<{
          message: string;
          timeout: number;
          onClickUndo: (() => void) | undefined;
          onUndoIgnored: (() => void) | undefined;
        }>
      ) => {
        const timestamp = Date.now();
        const item: ToastData = {
          message: event.detail.message,
          timeout: event.detail.timeout,
          timestamp: timestamp,
          onClickUndo: event.detail.onClickUndo,
          onUndoIgnored: event.detail.onUndoIgnored
        };
        toasts.push(item);
        toasts = toasts;

        setTimeout(() => {
          handleClickClose(item);
        }, item.timeout);
      }
    );
  });

  // Handlers:

  function handleClickUndo(item: ToastData) {
    if (item.onUndoIgnored) {
      // Prevents calling onUndoIgnored function, in case Undo action was clicked.
      item.onUndoIgnored = undefined;
    }
    handleClickClose(item);
    if (item.onClickUndo) {
      item.onClickUndo();
    }
  }

  function handleClickClose(item: ToastData) {
    if (item.onUndoIgnored) {
      item.onUndoIgnored();
    }
    const index: number = toasts.findIndex((t) => t.timestamp === item.timestamp);
    if (index === -1) {
      return;
    }
    toasts.splice(index, 1);
    toasts = toasts;
  }
</script>

<div id="toast-provider">
  {#each toasts as item (item.timestamp)}
    <div class="toast-wrapper" animate:flip in:fly={{ y: 100 }} out:fly={{ x: 100 }}>
      {#if item.onClickUndo === undefined}
        <Toast message={item.message} on:click={() => handleClickClose(item)} />
      {:else}
        <UndoToast
          message={item.message}
          onClickUndo={() => handleClickUndo(item)}
          on:click={() => handleClickClose(item)}
        />
      {/if}
    </div>
  {/each}
</div>

<style>
  #toast-provider {
    position: fixed;
    top: 50%;
    right: 1rem;
    z-index: 1001;
    transform: translate(0, -50%);

    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-end;
  }
</style>
