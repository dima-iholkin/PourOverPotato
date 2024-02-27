<script lang="ts">
  import { addToast } from "$lib/UI/generic-components/toasts/toastProvider";
</script>

<button type="button" on:click={() => addToast("hello world")}> Add toast </button>

<style lang="postcss">
  button {
    @apply text-purple-500 border border-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-purple-400 focus:ring-purple-300 focus:ring-4 focus:outline-none;

    margin-bottom: 2rem;
  }
</style>
