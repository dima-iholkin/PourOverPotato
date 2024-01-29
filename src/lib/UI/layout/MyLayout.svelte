<script lang="ts">
  import MyBottomNav from "./components/MyBottomNav.svelte";
  import MyHeader from "./components/MyHeader.svelte";
  import MySidebar from "./components/MySidebar.svelte";

  // State:

  let rightPanelOpened = false;
</script>

<MyHeader />
<div class="header-gap" />

<div style="display: flex; flex-direction: row;">
  <MySidebar />

  <div class="page-container">
    <slot />
    <div class="bottom-gap" />
  </div>
</div>

<MyBottomNav />

<style lang="postcss">
  .header-gap {
    height: 88px;
  }

  .page-container {
    min-width: 40%;
    margin-left: auto;
    margin-right: auto;

    padding-left: 1rem;
    padding-right: 1rem;
  }

  .bottom-gap {
    height: 80px;
  }

  @media only screen and (width < 800px) {
    .page-container {
      width: 100%;
    }

    .bottom-gap {
      height: 140px;
    }
  }
</style>
