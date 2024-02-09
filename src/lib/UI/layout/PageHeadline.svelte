<h1>
  <slot />
</h1>

<style lang="postcss">
  h1 {
    /* Layout: */
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    /* Font: */
    @apply text-2xl font-bold tracking-tight;

    /* Colors: */
    @apply text-gray-900 dark:text-white;
  }
</style>
