<script lang="ts">
  // import { Navbar, NavbarBackLink } from "konsta/svelte";
  import { page } from "$app/stores";
  import { goto, invalidateAll } from "$app/navigation";
  import { devFillDB } from "../../../../database/devData/devFillDB";
  import LoveIcon from "$lib/UI/icons/LoveIcon.svelte";
  const { MODE } = import.meta.env;

  // Props:

  // export let onMenuClick: () => void;

  // State:

  $: pathname = "/";
  page.subscribe((pageInfo) => {
    pathname = pageInfo.url.pathname;
  });

  // Handler functions:

  function handleBackButtonClick() {
    if (history.length === 0 || document.referrer.indexOf(window.location.host) === -1) {
      goto("/", { replaceState: true });
    } else {
      history.back();
    }
  }

  async function handleInitDevDB() {
    if (MODE === "development") {
      await devFillDB();

      setTimeout(() => location.reload(), 1000);

      alert("Dev DB filled.");
    }
  }
</script>

<!-- {#if pathname !== "/"}
  <Navbar>
    <NavbarBackLink slot="left" text="Back" onClick={handleBackButtonClick} />
    <a slot="title" href="/">
      <h1>PourOverPotato</h1>
    </a>
    <a slot="subtitle" href="/">
      <p>Save your best recipes for later use</p>
    </a>
    <div slot="right" style="display: flex; flex-direction: row;">
      {#if MODE === "development"}
        <button style="border: solid orange;" on:click={handleInitDevDB}>Initialize dev DB</button>
      {/if}

      <button class="menu-button" on:click={onMenuClick}>
        <span class="material-icons md-36">menu</span>
      </button>
    </div>
  </Navbar>
{:else}
  <Navbar>
    <LoveIcon slot="left" />
    <a slot="title" href="/">
      <h1>PourOverPotato</h1>
    </a>
    <a slot="subtitle" href="/">
      <p>Save your best recipes for later use</p>
    </a>
    <div slot="right" style="display: flex; flex-direction: row;">
      {#if MODE === "development"}
        <button style="border: solid orange;" on:click={handleInitDevDB}>Initialize dev DB</button>
      {/if}

      <button class="menu-button" on:click={onMenuClick}>
        <span class="material-icons md-36">menu</span>
      </button>
    </div>
  </Navbar>
{/if} -->

<nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div class="flex flex-wrap items-center justify-between mx-auto p-4">
    <div class="flex items-center space-x-3 rtl:space-x-reverse">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PourOverPotato</span>
    </div>
    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" class="menu-button" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
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
</nav>

<style lang="postcss">
  /* @media only screen and (min-width: 800px) {
    .menu-button {
      display: none;
    }
  } */

  .menu-button {
    @apply inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden;
    @apply hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400;
    @apply dark:hover:bg-gray-700 dark:focus:ring-gray-600;
  }
</style>
