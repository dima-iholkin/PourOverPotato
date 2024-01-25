<script lang="ts">
  import { Navbar, NavbarBackLink } from "konsta/svelte";
  import { page } from "$app/stores";
  import { goto, invalidateAll } from "$app/navigation";
  import { devFillDB } from "../database/devData/devFillDB";
  import LoveIcon from "./LoveIcon.svelte";
  const { MODE } = import.meta.env;

  // Props:

  export let onMenuClick: () => void;

  // State:

  $: pathname = "/";
  page.subscribe((pageInfo) => {
    pathname = pageInfo.url.pathname;
  });

  // Event handlers:

  function handleBackButtonClick() {
    if (history.length === 0 || document.referrer.indexOf(window.location.host) === -1) {
      goto("/", { replaceState: true });
    } else {
      history.back();
    }
  }

  async function handleInitDevDB() {
    if (MODE === "development") {
      await devFillDB();

      setTimeout(() => location.reload(), 1000);

      alert("Dev DB filled.");
    }
  }
</script>

{#if pathname !== "/"}
  <Navbar>
    <NavbarBackLink slot="left" text="Back" onClick={handleBackButtonClick} />
    <a slot="title" href="/">
      <h1>PourOverPotato</h1>
    </a>
    <a slot="subtitle" href="/">
      <p>Save your best recipes for later use</p>
    </a>
    <div slot="right" style="display: flex; flex-direction: row;">
      {#if MODE === "development"}
        <button style="border: solid orange;" on:click={handleInitDevDB}>Initialize dev DB</button>
      {/if}

      <!-- <button class="menu-button" on:click={onMenuClick}>
        <span class="material-icons md-36">menu</span>
      </button> -->
    </div>
  </Navbar>
{:else}
  <Navbar>
    <LoveIcon slot="left" />
    <a slot="title" href="/">
      <h1>PourOverPotato</h1>
    </a>
    <a slot="subtitle" href="/">
      <p>Save your best recipes for later use</p>
    </a>
    <div slot="right" style="display: flex; flex-direction: row;">
      {#if MODE === "development"}
        <button style="border: solid orange;" on:click={handleInitDevDB}>Initialize dev DB</button>
      {/if}

      <!-- <button class="menu-button" on:click={onMenuClick}>
        <span class="material-icons md-36">menu</span>
      </button> -->
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
