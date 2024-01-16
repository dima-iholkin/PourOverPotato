<script lang="ts">
  import { SvelteUIProvider } from "@svelteuidev/core";
  import { fns, AppShell, Navbar, Header, Title, Divider, Button } from "@svelteuidev/core";

  let opened = false;

  function toggleOpened() {
    opened = !opened;
  }
</script>

<SvelteUIProvider>
  <AppShell>
    <!-- Toggle the "display: hidden;" style. -->
    <Navbar
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
    </Navbar>
    <Header slot="header" height={65} style="display: flex; justify-content: space-between;" fixed>
      <!-- Navbar icon goes here. Toggle hidden state based on the variable "opened". -->
      <h3>PourOverPotato</h3>
      <div><p>Login</p></div>
    </Header>

    <div style="padding-left: 120px;">
      <slot />
    </div>
  </AppShell>
</SvelteUIProvider>
