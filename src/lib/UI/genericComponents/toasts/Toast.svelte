<script lang="ts">
  // UI props:
  export let message: string;
</script>

<!-- eslint-disable max-len -->
<div
  class="my-toast flex items-center max-w-xl p-4 bg-gray-100 rounded-lg shadow"
  role="alert"
>
  <div
    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg"
  >
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
      />
    </svg>
    <span class="sr-only">Check icon</span>
  </div>
  <div id="toast-content" class="text-base font-normal">{message}</div>
  <slot name="button" />
  <button
    class="my-close-button ms-auto -mx-1.5 -my-1.5 bg-gray-200 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-300 inline-flex items-center justify-center h-8 w-8"
    data-dismiss-target="#toast-success"
    type="button"
    aria-label="Close"
    on:click
  >
    <span class="sr-only">Close</span>
    <svg class="w-3 h-3" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  </button>
</div>

<style>
  @media only screen and (width < 800px) {
    .my-toast {
      max-width: min(36rem, 90vw);
    }
  }

  .my-toast {
    column-gap: 0.5rem;
    pointer-events: auto;
  }

  .my-close-button {
    flex-shrink: 0;
  }

  #toast-content {
    overflow-wrap: anywhere;
  }
</style>
