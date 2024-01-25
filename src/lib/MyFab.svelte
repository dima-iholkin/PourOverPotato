<script lang="ts">
  import { Fab } from "konsta/svelte";
  import PlusIcon from "./PlusIcon.svelte";

  export let href: string | undefined;
</script>

<Fab
  class="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20"
  text="Add recipe"
  href={href}
  style="margin-bottom: 64px;"
>
  <svelte:component this={PlusIcon} slot="icon" />
</Fab>
