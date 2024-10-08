<script lang="ts">
  import { routes } from "$lib/domain/constants/routes";
  import { clickOutsideTheBox } from "$lib/UI/_helpers/clickOutsideTheBox";

  // State:
  let menuOpen: boolean = false;
  let menuDom: Element;
  let menuButtonDom: Element;

  // Handlers:

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function handleDocumentClick(event: MouseEvent & { currentTarget: EventTarget & Document }) {
    if (menuOpen === false) {
      return;
    }
    if (clickOutsideTheBox(menuDom, event) && clickOutsideTheBox(menuButtonDom, event)) {
      menuOpen = false;
    }
  }

  function handleMenuItemClick() {
    menuOpen = false;
  }
</script>

<svelte:document on:click={handleDocumentClick} />

<div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  <button
    class="menu-button"
    type="button"
    aria-controls="navbar-sticky"
    aria-expanded="false"
    bind:this={menuButtonDom}
    on:click={toggleMenu}
  >
    <svg class="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M1 1h15M1 7h15M1 13h15"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  </button>
</div>
<div class="menu-div" bind:this={menuDom} class:hidden={!menuOpen}>
  <ul class="ul-menu">
    <li>
      <a class="a-menu" href={routes.home} aria-current="page" on:click={handleMenuItemClick}> Coffee Beans </a>
    </li>
    <li>
      <a class="a-menu" href={routes.recipes} aria-current="page" on:click={handleMenuItemClick}> Recipes </a>
    </li>
    <li>
      <a class="a-menu" href={routes.other} aria-current="page" on:click={handleMenuItemClick}> Other </a>
    </li>
  </ul>
</div>

<style lang="postcss">
  .hidden {
    display: none !important;
  }

  .menu-button {
    @apply inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden;
    @apply hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200;
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
    @apply rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white;
  }

  .a-menu {
    @apply block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0;
    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>
