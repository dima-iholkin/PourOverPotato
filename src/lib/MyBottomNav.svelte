<script lang="ts">
  import { page } from "$app/stores";

  // console.log($page);
</script>

<div
  id="bottom-nav"
  class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600"
>
  <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
    <a href="/">
      <button
        class:active={$page.route.id === "/"}
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <span class="material-icons"> auto_awesome </span>
        <span
          class:active={$page.route.id === "/"}
          class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
        >
          Coffee beans
        </span>
      </button>
    </a>
    <a href="/recipes">
      <button
        class:active={$page.route.id === "/recipes"}
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <span class="material-icons"> notes </span>
        <span
          class:active={$page.route.id === "/recipes"}
          class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
        >
          All recipes
        </span>
      </button>
    </a>
    <a href="/settings">
      <button
        class:active={$page.route.id === "/settings"}
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <span class="material-icons"> settings </span>
        <span
          class:active={$page.route.id === "/settings"}
          class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
        >
          Settings
        </span>
      </button>
    </a>
  </div>
</div>

<style>
  @media only screen and (min-width: 800px) {
    #bottom-nav {
      display: none;
    }
  }

  .active {
    color: red;
  }

  button {
    height: 100%;
  }
</style>
