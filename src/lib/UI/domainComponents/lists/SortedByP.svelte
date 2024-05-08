<p>
  <slot />
</p>

<style lang="postcss">
  p {
    /* Layout: */
    margin-top: 1rem;

    /* Typography: */
    @apply text-base font-normal tracking-tight;

    /* Colors: */
    @apply text-gray-900 dark:text-white;
  }
</style>
