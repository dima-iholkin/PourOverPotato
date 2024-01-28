<script lang="ts">
  import { page } from "$app/stores";

  // State:

  $: selected = $page.route.id ?? "";
</script>

<aside aria-label="Sidebar">
  <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
    <ul class="space-y-2 font-medium">
      <li>
        <a href="/" class:bg-gray-200={selected === "/"}>
          <span class="ms-3">Coffee Beans</span>
        </a>
        <a href="/recipes" class:bg-gray-200={selected === "/recipes"}>
          <span class="ms-3">Recipes</span>
        </a>
        <a href="/settings" class:bg-gray-200={selected === "/settings"}>
          <span class="ms-3">Other</span>
        </a>
      </li>
    </ul>
  </div>
</aside>

<style lang="postcss">
  @media only screen and (width < 800px) {
    aside {
      display: none;
    }
  }

  aside {
    @apply fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0;

    padding-top: 88px;
  }

  a {
    @apply flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700;
  }
</style>
