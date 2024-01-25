<script lang="ts">
  import { App, Block, Link, Navbar, Page, Panel } from "konsta/svelte";
  import MyHeader from "./MyHeader.svelte";
  import MySidebar from "./MySidebar.svelte";
  import "../app.css";
  import MyBottomNav from "./MyBottomNav.svelte";

  let rightPanelOpened = false;
</script>

<App theme="material">
  <MyHeader onMenuClick={() => (rightPanelOpened = true)} />

  <div style="display: flex; flex-direction: row;">
    <MySidebar />
    <MySidebar hidden />

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

    <div style="min-width: 30%;">
      <slot />
      <div style="height: 64px;" />
    </div>
  </div>

  <MyBottomNav />
</App>
