<script lang="ts">
  import { Page, Navbar, NavbarBackLink, Block, MenuList, MenuListItem } from "konsta/svelte";
  // import DemoIcon from "../components/DemoIcon.svelte";
  let selected = "home";
  let selectedMedia = "home";

  export let opacity: Boolean = false;
  let opacityNumber = opacity ? 0 : 1;
  let positionStr: string = opacity ? "static" : "fixed";
  let st: string = ``;
</script>

<div>
  {#if opacity === false}
    <MenuList class="menu-list" style="padding: 0; margin: 0; position: fixed;">
      <MenuListItem title="Home" active={selected === "home"} onClick={() => (selected = "home")}>
        <!-- <DemoIcon slot="media" /> -->
      </MenuListItem>
      <MenuListItem title="Profile" active={selected === "profile"} onClick={() => (selected = "profile")}>
        <!-- <DemoIcon slot="media" /> -->
      </MenuListItem>
      <MenuListItem title="Settings" active={selected === "settings"} onClick={() => (selected = "settings")}>
        <!-- <DemoIcon slot="media" /> -->
      </MenuListItem>
    </MenuList>
  {:else}
    <MenuList class="menu-list" style="padding: 0; margin: 0; opacity: 0;">
      <MenuListItem title="Home" active={selected === "home"} onClick={() => (selected = "home")}>
        <!-- <DemoIcon slot="media" /> -->
      </MenuListItem>
      <MenuListItem title="Profile" active={selected === "profile"} onClick={() => (selected = "profile")}>
        <!-- <DemoIcon slot="media" /> -->
      </MenuListItem>
      <MenuListItem title="Settings" active={selected === "settings"} onClick={() => (selected = "settings")}>
        <!-- <DemoIcon slot="media" /> -->
      </MenuListItem>
    </MenuList>
  {/if}
</div>

<style>
  @media only screen and (width < 800px) {
    div {
      display: none;
    }
  }
</style>
