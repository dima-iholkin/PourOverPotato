<script lang="ts">
  import { clickOutsideTheBox } from "$lib/UI/_helpers/clickOutsideTheBox";
  import HamburgerMenuIcon from "$lib/UI/_icons/HamburgerMenuIcon.svelte";
  import type { Snippet } from "svelte";

  interface Props {
    button?: Snippet<[]>;
    modal?: Snippet<[]>;
    setDropdownState: (state: "open" | "closed") => void;
  }

  const {
    button,
    modal,
    setDropdownState = $bindable((state) => (isOpen = state === "open" ? true : false))
  }: Props = $props();

  // UI state:
  let isOpen: boolean = $state(false);

  // Pointers to DOM elements:
  let bind_buttonDom: Element;
  let bind_menuDom: Element;

  // Handlers:

  function handleDocumentClick(event: MouseEvent & { currentTarget: EventTarget & Document }) {
    if (isOpen && clickOutsideTheBox(bind_menuDom, event) && clickOutsideTheBox(bind_buttonDom, event)) {
      isOpen = false;
    }
  }

  function handleEscKey(event: KeyboardEvent) {
    if (isOpen && event.key === "Escape") {
      isOpen = false;
    }
  }
</script>

<svelte:document onkeydown={handleEscKey} onmousedown={handleDocumentClick} />

<div class="container">
  <button class="button" type="button" bind:this={bind_buttonDom} onclick={() => (isOpen = !isOpen)}>
    <HamburgerMenuIcon />
  </button>
  <div class="dropdown-container" bind:this={bind_menuDom} class:shown={isOpen}>
    <ul id="dropdown" class="py-2 text-sm text-gray-700" aria-labelledby="dropdownMenuIconButton">
      {@render button?.()}
    </ul>
  </div>
  {@render modal?.()}
</div>

<style lang="postcss">
  @reference "tailwindcss";

  .container {
    position: relative;
  }

  .button {
    @apply inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg;
    @apply hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50;
  }

  .dropdown-container {
    @apply bg-white rounded-lg shadow w-44;
    display: none;
    position: absolute;
    margin-top: 0.5rem;
    right: 0;
  }

  .shown {
    display: block !important;
  }
</style>
