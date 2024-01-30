<script lang="ts">
  import { routes } from "$lib/domain/routes";
  import MyHeader from "./MyHeader.svelte";

  // State:

  let menuOpen: boolean = false;

  let menuDom: Element;
  let menuButtonDom: Element;

  // Handler functions:

  function toggleMenu(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    menuOpen = !menuOpen;
  }

  function handleDocumentClick(event: MouseEvent & { currentTarget: EventTarget & Document }) {
    if (menuOpen === false) {
      return;
    }

    if (clickOutsideBox(menuDom, event) && clickOutsideBox(menuButtonDom, event)) {
      menuOpen = false;
    }
  }

  function handleMenuItemClick(event: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }) {
    menuOpen = false;
  }

  // Helper functions:

  function clickOutsideBox(element: Element, click: MouseEvent) {
    const box: DOMRect = element.getBoundingClientRect();
    let x: number = click.clientX;
    let y: number = click.clientY;

    if (x < box.left || x > box.right || y < box.top || y > box.bottom) {
      return true;
    }

    return false;
  }
</script>

<svelte:document on:click={handleDocumentClick} />

<div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  <button
    type="button"
    class="menu-button"
    aria-controls="navbar-sticky"
    aria-expanded="false"
    on:click={toggleMenu}
    bind:this={menuButtonDom}
  >
    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 1h15M1 7h15M1 13h15"
      />
    </svg>
  </button>
</div>
<div class="menu-div" class:hidden={!menuOpen} bind:this={menuDom}>
  <ul class="ul-menu">
    <li>
      <a href="/" class="a-menu" aria-current="page" on:click={handleMenuItemClick}> Coffee Beans </a>
    </li>
    <li>
      <a href="/recipes" class="a-menu" aria-current="page" on:click={handleMenuItemClick}> Recipes </a>
    </li>
    <li>
      <a href={routes.other} class="a-menu" aria-current="page" on:click={handleMenuItemClick}> Other </a>
    </li>
  </ul>
</div>

<style lang="postcss">
  .hidden {
    display: none !important;
  }

  .menu-button {
    @apply inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden;
    @apply hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400;
    @apply dark:hover:bg-gray-700 dark:focus:ring-gray-600;
  }

  .menu-div {
    @apply items-center justify-between w-full md:flex md:w-auto md:order-1;
  }

  @media only screen and (min-width: 800px) {
    .menu-div {
      display: none;
    }
  }

  .ul-menu {
    @apply flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8;
    @apply rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900;
    @apply dark:border-gray-700;
  }

  .a-menu {
    @apply block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0;
    @apply md:dark:text-blue-500;

    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>
