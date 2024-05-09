<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { routes } from "$lib/domain/constants/routes";
  import LeftArrowIcon from "$lib/UI/icons/LeftArrowIcon.svelte";
  import LoveIcon from "$lib/UI/icons/LoveIcon.svelte";

  // UI props:
  export let asGap: boolean = false;

  // URL state:
  let pathname: string = routes.home;

  // URL reactivity:
  page.subscribe((pageInfo) => {
    pathname = pageInfo.url.pathname;
  });

  // Handlers:
  function handleBackButtonClick() {
    if (history.length === 0) {
      goto(routes.home, { replaceState: true });
    } else {
      history.back();
    }
  }
</script>

<nav
  class:as-gap={asGap}
  class:nav-static={$page.url.pathname === routes.addRecipe() ||
    $page.url.pathname.substring(0, $page.url.pathname.lastIndexOf("/") + 1) + 1 === routes.recipeItem(1)}
>
  <div class="flex flex-wrap items-center justify-between mx-auto p-4">
    <div class="left-nav-side vertical-center-children">
      <div class="icon-button vertical-center-children">
        {#if pathname !== routes.home}
          <button class="vertical-center-children" on:click={handleBackButtonClick}>
            <LeftArrowIcon />
          </button>
        {:else}
          <LoveIcon />
        {/if}
      </div>
      <a href={routes.home}>
        <div class="logo-container">
          <span class="text-2xl font-semibold whitespace-nowrap dark:text-white">PourOverPotato</span>
          <p class="sublogo">Save your best recipes for later use</p>
        </div>
      </a>
    </div>
    <!-- <HamburgerMenu /> -->
  </div>
</nav>

<style lang="postcss">
  /* Outer layout: */

  nav {
    @apply bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600;
    z-index: 10;
  }

  .as-gap {
    position: static !important;
    visibility: hidden;
  }

  @media only screen and (width < 800px) {
    .nav-static {
      position: static !important;
    }

    .as-gap.nav-static {
      display: none !important;
    }
  }

  /* Left nav side: */

  .left-nav-side {
    gap: 1rem;
  }

  .icon-button {
    padding-bottom: 0.125rem;
  }

  .logo-container {
    @apply space-x-3 rtl:space-x-reverse;

    display: flex;
    flex-direction: column;
  }

  .sublogo {
    margin-left: 0 !important;
  }

  @media only screen and (width < 800px) {
    .sublogo {
      display: none;
    }
  }

  /* Helper: */
  .vertical-center-children {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
