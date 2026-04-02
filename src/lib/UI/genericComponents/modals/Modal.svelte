<script lang="ts">
  /* eslint-disable prefer-const */
  import { clickOutsideTheBox } from "$lib/UI/_helpers/clickOutsideTheBox";
  import MySidebar from "$lib/UI/layout/components/MySidebar.svelte";
  import type { Snippet } from "svelte";
  import ModalHeader from "./components/ModalHeader.svelte";

  interface Props {
    onStateChange: ((state: "open" | "closed") => void) | undefined;
    onFocusReverse: (() => void) | undefined;
    setState: ((state: "open" | "closed") => void) | undefined;
    setFocus: (() => void) | undefined;
    title: string | undefined;
    children: Snippet<[]>;
  }

  let {
    onStateChange = $bindable(),
    onFocusReverse = $bindable(),
    setState = $bindable((state) => {
      isOpen = state === "open" ? true : false;
      if (onStateChange) {
        onStateChange(state);
      }
    }),
    setFocus = $bindable(() => setFocusToModalHeader?.()),
    title,
    children
  }: Props = $props();

  // Bind triggers:
  let setFocusToModalHeader: (() => void) | undefined = $state(() => {});

  // Bind DOM elements:
  let modalDom: Element;

  // UI state:
  let isOpen: boolean = $state(false);

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

<svelte:document onkeydown={handleEscKey} onmousedown={handleDocumentClick} />

<div class="modal-container fixed inset-0 bg-gray-900/60 overflow-y-auto h-full w-full px-4" class:shown={isOpen}>
  <MySidebar asGap />
  <div class="vertical-center mx-auto">
    <div class="vertical-gap"></div>
    <div class="inner-container relative shadow-xl rounded-md bg-white" bind:this={modalDom}>
      <ModalHeader onClose={handleClose} {onFocusReverse} {title} bind:setFocus={setFocusToModalHeader} />
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
