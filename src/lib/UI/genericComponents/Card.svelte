<script lang="ts">
  // Props:
  export let href: string | undefined = undefined;
</script>

<a {href}>
  <slot />
</a>

<style lang="postcss">
  a {
    @apply block bg-white border border-gray-200 rounded-lg shadow;
    margin-top: 12px;
    margin-bottom: 12px;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
  }

  /* Both "active" and "hover" to fix the hover on mobile: */

  a:active {
    --tw-bg-opacity: 1;
    background-color: rgb(243 244 246 / var(--tw-bg-opacity));
  }

  @media (hover: hover) and (pointer: fine) {
    a:hover {
      --tw-bg-opacity: 1;
      background-color: rgb(243 244 246 / var(--tw-bg-opacity));
    }
  }
</style>
