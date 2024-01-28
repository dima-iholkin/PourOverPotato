<script lang="ts">
  import { App } from "konsta/svelte";
  import MyBottomNav from "./components/MyBottomNav.svelte";
  import MySidebar from "./components/MySidebar.svelte";
  import MyHeader from "./components/MyHeader.svelte";

  // State:

  let rightPanelOpened = false;
</script>

<App theme="material">
  <MyHeader onMenuClick={() => (rightPanelOpened = true)} />

  <div style="display: flex; flex-direction: row;">
    <MySidebar />
    <!-- <MySidebar hidden /> -->

    <div class="page-container">
      <slot />
      <div class="bottom-margin" />
    </div>
  </div>

  <MyBottomNav />
</App>

<style>
  .page-container {
    min-width: 30%;
    margin-left: auto;
    margin-right: auto;
  }

  .bottom-margin {
    height: 64px;
  }
</style>
