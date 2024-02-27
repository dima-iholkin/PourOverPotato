<script lang="ts">
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import Toast from "$lib/UI/generic-components/toasts/Toast.svelte";

  // UI state:

  let toasts: { message: string; timestamp: number }[] = [];

  // Lifecycle:

  onMount(() => {
    // @ts-ignore
    document.addEventListener("addToast", (event: CustomEvent<string>) => {
      const timestamp = Date.now();
      const item: { message: string; timestamp: number } = { message: event.detail, timestamp: timestamp };
      toasts.push(item);
      toasts = toasts;

      setTimeout(() => {
        handleToastClose(timestamp);
      }, 10000);
    });
  });

  // Handlers:

  function handleToastClose(timestamp: number) {
    const index: number = toasts.findIndex((t) => t.timestamp === timestamp);
    if (index === -1) {
      return;
    }
    toasts.splice(index, 1);
    toasts = toasts;
  }
</script>

<div id="toast-provider">
  {#each toasts as item (item.timestamp)}
    <div animate:flip in:fly={{ y: 100 }} out:fly={{ x: 100 }}>
      <Toast message={item.message} on:click={() => handleToastClose(item.timestamp)} />
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
  }
</style>
