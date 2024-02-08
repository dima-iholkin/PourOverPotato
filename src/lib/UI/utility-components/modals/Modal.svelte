<script lang="ts">
  import { clickOutsideTheBox } from "$lib/UI/helpers/clickOutsideTheBox";
  import MySidebar from "$lib/UI/layout/components/MySidebar.svelte";
  import ModalHeader from "./ModalHeader.svelte";

  // Props:

  export let open: boolean = false;
  export let title: string = "";

  // Events:

  export let onClose: (() => void) | undefined = undefined;

  // State:

  let modalDom: Element;

  // Handlers:

  function handleClose() {
    open = false;

    if (onClose !== undefined) {
      onClose();
    }
  }

  function handleDocumentClick(event: MouseEvent & { currentTarget: EventTarget & Document }) {
    if (clickOutsideTheBox(modalDom, event)) {
      handleClose();
    }
  }

  // Close the modal on Escape key press.
  function handleEscKey(event: KeyboardEvent) {
    if (event.key === "Escape") {
      handleClose();
    }
  }
</script>

<svelte:head>
  {#if open}
    <style>
      body {
        overflow-y: hidden visible;
      }
    </style>
  {/if}
</svelte:head>

<svelte:document on:keydown={handleEscKey} on:mousedown={handleDocumentClick} />

<div
  class="modal-container fixed inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
  class:my-hidden={open === false}
>
  <MySidebar asGap />
  <div class="vertical-center mx-auto">
    <div class="vertical-gap" />
    <div class="inner-container relative shadow-xl rounded-md bg-white" bind:this={modalDom}>
      <ModalHeader onClose={handleClose} {title} />
      <slot />
    </div>
    <div class="vertical-gap" />
  </div>
</div>

<style>
  .modal-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    z-index: 50;
  }

  .vertical-center {
    height: 100vh;
    flex-grow: 1;
    max-width: 60ch;

    display: flex;
    flex-direction: column;
  }

  .inner-container {
    width: 100%;
    padding: 1rem 2rem 1.5rem 2rem;
  }

  .vertical-gap {
    flex-grow: 1;
    min-height: 1rem;
  }

  .my-hidden {
    display: none !important;
  }
</style>
