<script lang="ts">
  // Props:
  export let for_: string | undefined;
  export let valid: boolean | undefined = true;
</script>

<label
  class={valid
    ? "block mb-2 text-sm font-medium text-gray-900"
    : "block mb-2 text-sm font-medium text-red-700"}
  for={for_}
>
  <slot />
</label>

<style>
  label {
    margin-right: 8px;
  }
</style>
