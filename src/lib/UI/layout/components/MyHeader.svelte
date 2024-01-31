<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import LeftArrowIcon from "$lib/UI/icons/LeftArrowIcon.svelte";
  import LoveIcon from "$lib/UI/icons/LoveIcon.svelte";
  import { routes } from "$lib/domain/routes";

  // Props:

  export let asGap: boolean = false;

  // State:

  $: pathname = routes.home;
  page.subscribe((pageInfo) => {
    pathname = pageInfo.url.pathname;
  });

  // Handler functions:

  function handleBackButtonClick() {
    if (history.length === 0 || document.referrer.indexOf(window.location.host) === -1) {
      goto(routes.home, { replaceState: true });
    } else {
      history.back();
    }
  }
</script>

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
    <!-- <HamburgerMenu /> -->
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
</style>
