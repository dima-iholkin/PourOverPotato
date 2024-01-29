<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import LeftArrowIcon from "$lib/UI/icons/LeftArrowIcon.svelte";
  import LoveIcon from "$lib/UI/icons/LoveIcon.svelte";

  // Props:

  export let asGap: boolean = false;

  // State:

  $: pathname = "/";
  page.subscribe((pageInfo) => {
    pathname = pageInfo.url.pathname;
  });

  let menuOpen: boolean = false;

  let menuDom: Element;
  let menuButtonDom: Element;

  // Handler functions:

  function handleBackButtonClick() {
    if (history.length === 0 || document.referrer.indexOf(window.location.host) === -1) {
      goto("/", { replaceState: true });
    } else {
      history.back();
    }
  }

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

<nav class:as-gap={asGap}>
  <div class="flex flex-wrap items-center justify-between mx-auto p-4">
    <div style="display: flex; flex-direction: row; align-items: center;">
      <div style="padding-right: 16px;">
        {#if pathname !== "/"}
          <button on:click={handleBackButtonClick}>
            <LeftArrowIcon />
          </button>
        {:else}
          <LoveIcon />
        {/if}
      </div>
      <a href="/">
        <div class="logo-div">
          <span class="text-2xl font-semibold whitespace-nowrap dark:text-white">PourOverPotato</span>
          <p class="subtitle">Save your best recipes for later use</p>
        </div>
      </a>
    </div>
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
        <a href="/settings" class="a-menu" aria-current="page" on:click={handleMenuItemClick}> Other </a>
      </li>
    </ul>
  </div>
</nav>

<style lang="postcss">
  nav {
    @apply bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600;
  }

  .as-gap {
    position: static !important;
    visibility: hidden;
  }

  .hidden {
    display: none !important;
  }

  .logo-div {
    @apply space-x-3 rtl:space-x-reverse;

    display: flex;
    flex-direction: column;
  }

  .subtitle {
    margin-left: 0 !important;
  }

  @media only screen and (width < 800px) {
    .subtitle {
      display: none;
    }
  }

  .menu-button {
    @apply inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden;
    @apply hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400;
    @apply dark:hover:bg-gray-700 dark:focus:ring-gray-600;
  }

  .menu-div {
    @apply items-center justify-between w-full md:flex md:w-auto md:order-1;

    position: fixed;
    /* top: 88px; */
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
