<script lang="ts">
  import MyBottomNav from "./components/MyBottomNav.svelte";
  import MySidebar from "./components/MySidebar.svelte";
  import MyHeader from "./components/MyHeader.svelte";

  // State:

  let rightPanelOpened = false;
</script>

<MyHeader />
<div class="header-gap" />

<div style="display: flex; flex-direction: row;">
  <MySidebar />

  <div class="page-container">
    <slot />
    <div class="bottom-margin" />
  </div>
</div>

<MyBottomNav />

<style lang="postcss">
  .header-gap {
    height: 88px;
  }

  .page-container {
    min-width: 30%;
    margin-left: auto;
    margin-right: auto;
  }

  .bottom-margin {
    height: 64px;
  }
</style>
