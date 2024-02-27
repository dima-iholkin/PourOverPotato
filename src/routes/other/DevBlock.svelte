<script lang="ts">
  import { addToast } from "$lib/UI/generic-components/toasts/toastProvider";
</script>

<div class="container">
  <button type="button" on:click={() => addToast("hello world")}> Add toast </button>
  <button type="button" on:click={() => addToast("hello world lorem ipsum shmipsum whateveripsum nowayitssolongipsum")}>
    Add long toast
  </button>
</div>

<style lang="postcss">
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;

    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  button {
    @apply text-purple-500 border border-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-purple-400 focus:ring-purple-300 focus:ring-4 focus:outline-none;
  }
</style>
