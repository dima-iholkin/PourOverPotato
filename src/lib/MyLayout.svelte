<script lang="ts">
  import { App, Icon, Block, Button, Link, Navbar, NavbarBackLink, Page, Panel } from "konsta/svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import "../app.css";
  import MyHeader from "./MyHeader.svelte";

  let rightPanelOpened = false;
</script>

<App theme="material">
  <Page>
    <MyHeader onMenuClick={() => (rightPanelOpened = true)} />

    <Panel side="right" opened={rightPanelOpened} onBackdropClick={() => (rightPanelOpened = false)}>
      <Page>
        <Navbar title="Right Panel">
          <Link slot="right" navbar onClick={() => (rightPanelOpened = false)}>Close</Link>
        </Navbar>
        <Block class="space-y-4">
          <p>Hello from Menu</p>
        </Block>
      </Page>
    </Panel>

    <slot />
  </Page>
</App>
