<script lang="ts">
  import { Navbar, NavbarBackLink } from "konsta/svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  export let onMenuClick: () => void;

  $: pathname = "/";
  page.subscribe((obj) => (pathname = obj.url.pathname));

  function handleBackButtonClick() {
    if (history.length === 0 || document.referrer.indexOf(window.location.host) === -1) {
      goto("/", { replaceState: true });
    } else {
      history.back();
    }
  }
</script>

{#if pathname !== "/"}
  <Navbar title="PourOverPotato">
    <NavbarBackLink slot="left" text="Back" onClick={handleBackButtonClick} />
    <p slot="subtitle">Save your best recipes for later use</p>
    <div slot="right" style="display: flex; flex-direction: row;">
      <p>Login</p>
      <button class="menu-button" on:click={onMenuClick}>
        <span class="material-icons md-36">menu</span>
      </button>
    </div>
  </Navbar>
{:else}
  <Navbar title="PourOverPotato">
    <NavbarBackLink slot="left" text="Back" onClick={handleBackButtonClick} style="opacity: 0;" />
    <p slot="subtitle">Save your best recipes for later use</p>
    <div slot="right" style="display: flex; flex-direction: row;">
      <p>Login</p>
      <button class="menu-button" on:click={onMenuClick}>
        <span class="material-icons md-36">menu</span>
      </button>
    </div>
  </Navbar>
{/if}

<!-- <div style="height: min-content;"><p>Fuck you CSS</p></div> -->

<style>
  @media only screen and (min-width: 800px) {
    .menu-button {
      display: none;
    }
  }
</style>
