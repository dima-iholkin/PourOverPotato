<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import OtherIcon from "$lib/UI/icons/OtherIcon.svelte";
  import coffeeBeansIcon from "$lib/assets/coffee-beans-icon.png";
  import { routes } from "$lib/domain/routes";

  // State:

  $: route = base + $page.route.id;
</script>

<div class="bottom-nav">
  <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
    <a href={routes.recipes}>
      <button class:active={route === routes.recipes} type="button">
        <span class:active={route === routes.recipes} class="material-icons md-24" style="padding: 2px 0;">
          content_copy
        </span>
        <span class:active={route === routes.recipes}> Recipes </span>
      </button>
    </a>
    <a href={routes.home}>
      <button class:active={route === routes.home} type="button">
        <img alt="A coffee beans icon" src={coffeeBeansIcon} class:active-img={route === routes.home} />
        <span class:active={route === routes.home}> Coffee beans </span>
      </button>
    </a>
    <a href={routes.other}>
      <button class:active={route === routes.other} type="button">
        <OtherIcon />
        <span class:active={route === routes.other}> Other </span>
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
    @apply text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500;
  }

  button {
    @apply inline-flex flex-col items-center justify-center px-5 dark:hover:bg-gray-800;

    width: 100%;
  }

  button:active {
    --tw-bg-opacity: 1;
    background-color: rgb(249 250 251 / var(--tw-bg-opacity));
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover {
      --tw-bg-opacity: 1;
      background-color: rgb(249 250 251 / var(--tw-bg-opacity));
    }
  }

  .bottom-nav {
    @apply fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700;
    @apply dark:border-gray-600;

    z-index: 49;
  }
</style>
