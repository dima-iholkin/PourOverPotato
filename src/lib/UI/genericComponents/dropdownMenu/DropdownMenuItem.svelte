<script lang="ts">
  // Props:
  export let buttonText: string;
</script>

<li>
  <button type="button" on:click>{buttonText}</button>
</li>

<style lang="postcss">
  button {
    /* Layout: */
    @apply block px-4 py-2;
    width: 100%;
    text-align: left;
    /* Colors: */
    @apply text-red-600 hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white;
  }
</style>
