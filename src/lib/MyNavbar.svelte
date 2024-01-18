<script lang="ts">
  // import { SvelteUIProvider } from "@svelteuidev/core";
  // import { Navbar, Button } from "@svelteuidev/core";

  let opened = false;

  function toggleOpened() {
    opened = !opened;
  }
</script>

<!-- Toggle the "display: hidden;" style. -->

<!-- <Navbar
  slot="navbar"
  hidden={!opened}
  style="display: flex; flex-direction: column; justify-content: space-between; width: auto;"
>
  <div>
    <Button>Coffee Beans</Button>
    <Button>All recipes</Button>
  </div>
  <div>
    <Button>Settings</Button>
  </div>
</Navbar> -->
