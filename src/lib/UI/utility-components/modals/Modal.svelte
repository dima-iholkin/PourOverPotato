<script lang="ts">
  import { clickOutsideTheBox } from "$lib/UI/helpers/clickOutsideTheBox";
  import MySidebar from "$lib/UI/layout/components/MySidebar.svelte";
  import ModalHeader from "./ModalHeader.svelte";

  // Events:

  export let onStateChange: ((state: "open" | "closed") => void) | undefined = undefined;

  // Triggers:

  // prettier-ignore
  export const setState = (state: "open" | "closed") => {
    isOpen = state === "open"
      ? true
      : false;
  };

  // UI props:

  export let title: string | undefined;

  // UI state:

  let isOpen: boolean = false;

  // DOM state:

  let modalDom: Element;

  // Handlers:

  function handleClose() {
    isOpen = false;

    if (onStateChange !== undefined) {
      onStateChange("closed");
    }
  }

  function handleDocumentClick(event: MouseEvent & { currentTarget: EventTarget & Document }) {
    if (isOpen && clickOutsideTheBox(modalDom, event)) {
      handleClose();
    }
  }

  function handleEscKey(event: KeyboardEvent) {
    if (isOpen && event.key === "Escape") {
      handleClose();
    }
  }
</script>

<svelte:head>
  {#if isOpen}
    <style>
      body {
        overflow-y: hidden;
      }

      body > div > div#content {
        overflow-y: scroll;
      }
    </style>
  {/if}
</svelte:head>

<svelte:document on:keydown={handleEscKey} on:mousedown={handleDocumentClick} />

<div
  class="modal-container fixed inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
  class:my-hidden={isOpen === false}
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
