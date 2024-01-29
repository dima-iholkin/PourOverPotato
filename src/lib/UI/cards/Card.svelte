<script lang="ts">
  export let href: string | undefined = undefined;
</script>

<a {href}>
  <slot />
</a>

<style lang="postcss">
  a {
    @apply block bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800;
    @apply dark:border-gray-700 dark:hover:bg-gray-700;

    margin-top: 12px;
    margin-bottom: 12px;

    padding: 1rem 1.5rem 1.5rem 1.5rem;
  }
</style>
