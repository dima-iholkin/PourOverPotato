<script lang="ts">
  /* eslint-disable prefer-const */
  import { clickOutsideTheBox } from "$lib/UI/_helpers/clickOutsideTheBox";
  import MySidebar from "$lib/UI/layout/components/MySidebar.svelte";
  import type { Snippet } from "svelte";
  import ModalHeader from "./components/ModalHeader.svelte";

  interface Props {
    /**
     * Optional. Modal header text. */
    title?: string;
    /**
     * Subscribe to focus leaving the modal. */
    onFocusReverse: (() => void) | undefined;
    /**
     * Bindable, state of modal being shown or hidden. */
    showModal: boolean;
    children: Snippet<[]>;
  }

  let { title, onFocusReverse = $bindable(), showModal = $bindable(false), children }: Props = $props();

  // ----- Inner logic: -----

  // Handle closing command:
  function handleClose() {
    showModal = false;
  }

  // DOM pointers:
  let modalDom: Element;

  // Handle mouse commands:
  function handleMousedown_OutsideModal(event: MouseEvent & { currentTarget: EventTarget & Document }) {
    if (showModal && clickOutsideTheBox(modalDom, event)) {
      handleClose();
    }
  }

  // Handle keyboard commands:
  function handleEscKey(event: KeyboardEvent) {
    if (showModal && event.key === "Escape") {
      handleClose();
    }
  }
</script>

<svelte:head>
  {#if showModal}
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

<svelte:document onkeydown={handleEscKey} onmousedown={handleMousedown_OutsideModal} />

<div class="modal-container fixed inset-0 bg-gray-900/60 overflow-y-auto h-full w-full px-4" class:shown={showModal}>
  <MySidebar asGap />
  <div class="vertical-center mx-auto">
    <div class="vertical-gap"></div>
    <div class="inner-container relative shadow-xl rounded-md bg-white" bind:this={modalDom}>
      <ModalHeader onClose={handleClose} {onFocusReverse} {title} />
      {@render children?.()}
    </div>
    <div class="vertical-gap"></div>
  </div>
</div>

<style>
  /* Outer layour: */

  .modal-container {
    display: none;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    z-index: 1050;
  }

  .shown {
    display: flex !important;
  }

  .vertical-gap {
    flex-grow: 1;
    min-height: 1rem;
  }

  /* Inner layout: */
  .inner-container {
    width: 100%;
    padding: 1rem 2rem 1.5rem 2rem;
  }

  /* Helper: */
  .vertical-center {
    height: 100vh;
    flex-grow: 1;
    max-width: 60ch;
    display: flex;
    flex-direction: column;
  }
</style>
