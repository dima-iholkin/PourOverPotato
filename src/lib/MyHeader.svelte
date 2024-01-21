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
  <Navbar>
    <a slot="title" href="/">
      <h1>PourOverPotato</h1>
    </a>
    <a slot="subtitle" href="/">
      <p>Save your best recipes for later use</p>
    </a>
    <NavbarBackLink slot="left" text="Back" onClick={handleBackButtonClick} />
    <div slot="right" style="display: flex; flex-direction: row;">
      <p>Login</p>
      <button class="menu-button" on:click={onMenuClick}>
        <span class="material-icons md-36">menu</span>
      </button>
    </div>
  </Navbar>
{:else}
  <Navbar>
    <a slot="title" href="/">
      <h1>PourOverPotato</h1>
    </a>
    <a slot="subtitle" href="/">
      <p>Save your best recipes for later use</p>
    </a>
    <NavbarBackLink slot="left" text="Back" onClick={handleBackButtonClick} style="opacity: 0;" />
    <div slot="right" style="display: flex; flex-direction: row;">
      <p>Login</p>
      <button class="menu-button" on:click={onMenuClick}>
        <span class="material-icons md-36">menu</span>
      </button>
    </div>
  </Navbar>
{/if}

<style>
  @media only screen and (min-width: 800px) {
    .menu-button {
      display: none;
    }
  }
</style>
