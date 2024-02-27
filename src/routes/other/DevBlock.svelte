<script lang="ts">
  import { addToast } from "$lib/UI/generic-components/toasts/toastProvider";
</script>

<h5 class="page-headline">Dev</h5>
<button type="button" on:click={() => addToast("hello world")}> Add toast </button>

<style lang="postcss">
  h5 {
    @apply text-2xl font-bold tracking-tight text-gray-900 dark:text-white;

    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  button {
    @apply text-green-500 border border-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-green-400 focus:ring-green-300 focus:ring-4 focus:outline-none;

    margin-bottom: 1.5rem;
  }
</style>
