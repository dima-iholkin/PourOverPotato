<script lang="ts">
  import MyLayout from "$lib/MyLayout.svelte";
  import { onMount } from "svelte";
  import { useDB } from "../database/indexedDB";

  onMount(() => {
    useDB();
  });
</script>

<MyLayout>
  <slot />
</MyLayout>
