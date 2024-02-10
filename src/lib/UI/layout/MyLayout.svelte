<script lang="ts">
  import MyBottomNav from "./components/MyBottomNav.svelte";
  import MyHeader from "./components/MyHeader.svelte";
  import MySidebar from "./components/MySidebar.svelte";
</script>

<MyHeader />
<MyHeader asGap />

<MySidebar />

<div id="content" style="display: flex; flex-direction: row;">
  <MySidebar asGap />
  <div class="page-container">
    <slot />
    <div class="bottom-gap" />
  </div>
</div>
<MyBottomNav asGap />

<MyBottomNav />

<style lang="postcss">
  .page-container {
    flex-grow: 1;
    max-width: 80ch;

    margin-left: auto;
    margin-right: auto;

    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media only screen and (width < 800px) {
    .page-container {
      width: 100%;
    }
  }

  .bottom-gap {
    height: 1rem;
  }
</style>
