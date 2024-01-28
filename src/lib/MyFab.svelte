<script lang="ts">
  import { Fab } from "konsta/svelte";
  import PlusIcon from "./PlusIcon.svelte";

  export let href: string | undefined;
</script>

<div class="my-fab">
  <Fab
    class="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20"
    text="Add recipe"
    style="margin-bottom: 64px;"
    {href}
  >
    <svelte:component this={PlusIcon} slot="icon" />
  </Fab>
</div>

<style>
  /* @media only screen and (width < 800px) {
    .my-fab {
      margin-bottom: 128px;
    }
  } */
</style>
