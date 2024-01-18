<script lang="ts">
  import { Navbar, NavbarBackLink } from "konsta/svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import "../app.css";

  export let onMenuClick: () => void;

  function handleBackButtonClick() {
    if (history.length === 0 || document.referrer.indexOf(window.location.host) === -1) {
      goto("/", { replaceState: true });
    } else {
      history.back();
    }
  }
</script>

{#if $page.url.pathname !== "/"}
  <Navbar title="PourOverPotato">
    <NavbarBackLink slot="left" text="Back" onClick={handleBackButtonClick} />
    <div slot="right" style="display: flex; flex-direction: row;">
      <p>Login</p>
      <button on:click={onMenuClick}>
        <span class="material-icons md-36">menu</span>
      </button>
    </div>
  </Navbar>
{:else}
  <Navbar title="PourOverPotato">
    <div slot="right" style="display: flex; flex-direction: row;">
      <p>Login</p>
      <button on:click={onMenuClick}>
        <span class="material-icons md-36">menu</span>
      </button>
    </div>
  </Navbar>
{/if}
