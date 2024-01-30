<script lang="ts">
  import { page } from "$app/stores";
    import { routes } from "$lib/domain/routes";

  // Props:

  export let asGap: boolean = false;

  // State:

  $: selected = $page.route.id ?? "";
</script>

<aside class="my-aside" class:as-gap={asGap} aria-label="Sidebar">
  <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
    <ul class="space-y-2 font-medium">
      <li>
        <a href="/" class:bg-gray-200={selected === "/"}>
          <span class="ms-3">Coffee beans</span>
        </a>
        <a href="/recipes" class:bg-gray-200={selected === "/recipes"}>
          <span class="ms-3">Recipes</span>
        </a>
        <a href={routes.other} class:bg-gray-200={selected === routes.other}>
          <span class="ms-3">Other</span>
        </a>
      </li>
    </ul>
  </div>
</aside>

<style lang="postcss">
  @media only screen and (width < 800px) {
    .my-aside {
      display: none;
    }
  }

  .my-aside {
    @apply fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0;

    padding-top: 88px;
  }

  .as-gap {
    position: static;
    visibility: hidden;
  }

  a {
    @apply flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700;
  }
</style>
