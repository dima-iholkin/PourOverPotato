<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    for_?: string;
    valid?: boolean;
    children: Snippet<[]>;
  }

  const { for_, valid = true, children }: Props = $props();
</script>

<label
  class={valid ? "block mb-2 text-sm font-medium text-gray-900" : "block mb-2 text-sm font-medium text-red-700"}
  for={for_}
>
  {@render children?.()}
</label>

<style>
  label {
    margin-right: 8px;
  }
</style>
