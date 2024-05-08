<script lang="ts">
  import { clickOutsideTheBox } from "$lib/UI/helpers/clickOutsideTheBox";
  import HamburgerMenuIcon from "$lib/UI/icons/HamburgerMenuIcon.svelte";

  // Triggers:
  // prettier-ignore
  export const setDropdownState = (state: "open" | "closed") => {
    isOpen = (state === "open") ? true : false;
  };

  // UI state:
  let isOpen: boolean = false;

  // Bind DOM elements:
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

<svelte:document on:keydown={handleEscKey} on:mousedown={handleDocumentClick} />

<div class="container">
  <button class="button" type="button" bind:this={bind_buttonDom} on:click={() => (isOpen = !isOpen)}>
    <HamburgerMenuIcon />
  </button>
  <div class="dropdown-container" bind:this={bind_menuDom} class:shown={isOpen}>
    <ul id="dropdown" class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
      <slot name="button" />
    </ul>
  </div>
  <slot name="modal" />
</div>

<style lang="postcss">
  .container {
    position: relative;
  }

  .button {
    @apply inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg;
    @apply hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800;
    @apply dark:hover:bg-gray-700 dark:focus:ring-gray-600;
  }

  .dropdown-container {
    @apply bg-white rounded-lg shadow w-44 dark:bg-gray-700;

    display: none;
    position: absolute;

    margin-top: 0.5rem;
    right: 0;
  }

  .shown {
    display: block !important;
  }
</style>
