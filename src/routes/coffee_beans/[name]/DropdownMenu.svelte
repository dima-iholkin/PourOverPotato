<script lang="ts">
  // State:

  let showMenu: boolean = false;

  let menuButtonDom: Element;
  let menuDom: Element;

  // Handler functions:

  function handleDocumentClick(event: MouseEvent & { currentTarget: EventTarget & Document }) {
    if (showMenu === false) {
      return;
    }

    if (clickOutsideBox(menuDom, event) && clickOutsideBox(menuButtonDom, event)) {
      showMenu = false;
    }
  }

  // Helper functions:

  function clickOutsideBox(element: Element, click: MouseEvent) {
    const box: DOMRect = element.getBoundingClientRect();
    const x: number = click.clientX;
    const y: number = click.clientY;

    if (x < box.left || x > box.right || y < box.top || y > box.bottom) {
      return true;
    }

    return false;
  }
</script>

<!-- eslint-disable max-len -->

<svelte:document on:click={handleDocumentClick} />

<div class="container">
  <button bind:this={menuButtonDom} class="button" on:click={() => (showMenu = !showMenu)} type="button">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 4 15" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      />
    </svg>
  </button>

  <!-- Dropdown menu -->
  <div bind:this={menuDom} class="dropdown-container" class:menu-shown={showMenu}>
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
      <li>
        <button class="menu-item" type="button">Delete</button>
      </li>
    </ul>
  </div>
</div>

<style lang="postcss">
  .menu-shown {
    display: block !important;
    position: absolute;
  }

  .container {
    position: relative;
  }

  .button {
    @apply inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg;
    @apply hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800;
    @apply dark:hover:bg-gray-700 dark:focus:ring-gray-600;

    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }

  .dropdown-container {
    @apply z-10 hidden bg-white rounded-lg shadow w-44 dark:bg-gray-700;

    margin-top: 0.5rem;
    right: 0;
  }

  .menu-item {
    @apply block px-4 py-2 text-red-600 hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white;

    width: 100%;
    text-align: left;
  }
</style>
