<script lang="ts">
  import { page } from "$app/stores";
  import OtherIcon from "$lib/UI/icons/OtherIcon.svelte";
  import coffeeBeansIcon from "$lib/assets/coffee-beans-icon.png";
</script>

<div class="bottom-nav">
  <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
    <a href="/recipes">
      <button class:active={$page.route.id === "/recipes"} type="button">
        <span class:active={$page.route.id === "/recipes"} class="material-icons md-24" style="padding: 2px 0;">
          content_copy
        </span>
        <span class:active={$page.route.id === "/recipes"} class=""> Recipes </span>
      </button>
    </a>
    <a href="/">
      <button class:active={$page.route.id === "/"} type="button">
        <img alt="A coffee beans icon" src={coffeeBeansIcon} class:active-img={$page.route.id === "/"} />
        <span class:active={$page.route.id === "/"}> Coffee beans </span>
      </button>
    </a>
    <a href="/settings">
      <button class:active={$page.route.id === "/settings"} type="button">
        <OtherIcon />
        <span class:active={$page.route.id === "/settings"}> Other </span>
      </button>
    </a>
  </div>
</div>

<style lang="postcss">
  @media only screen and (min-width: 800px) {
    .bottom-nav {
      display: none;
    }
  }

  .active {
    color: blue;
  }

  .active-img {
    filter: invert(8%) sepia(100%) saturate(7471%) hue-rotate(248deg) brightness(97%) contrast(143%);
  }

  button {
    height: 100%;
  }

  img {
    height: 24px;
  }

  span {
    @apply text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500;
  }

  button {
    @apply inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800;

    width: 100%;
  }

  .bottom-nav {
    @apply fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700;
    @apply dark:border-gray-600;
  }
</style>
