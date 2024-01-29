<script lang="ts">
  // Props:

  export let _for: string | undefined;

  export let valid: boolean | undefined = true;
</script>

<label for={_for} class={valid === true ? "valid" : "invalid"}>
  <slot />
</label>

<style lang="postcss">
  label {
    margin-right: 8px;
  }

  .valid {
    @apply block mb-2 text-sm font-medium text-gray-900 dark:text-white;
  }

  .invalid {
    @apply block mb-2 text-sm font-medium text-red-700 dark:text-red-500;
  }
</style>
