<script lang="ts">
  import { Page, Navbar, NavbarBackLink, Block, MenuList, MenuListItem } from "konsta/svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  export let opacity: Boolean = false;

  $: selected = $page.route.id?.split("/")[1];

  function handleClick(route: string) {
    goto(route);
  }
</script>

<div>
  {#if opacity === false}
    <MenuList class="menu-list" style="padding: 0; margin: 0; position: fixed;">
      <MenuListItem
        title="Coffee beans"
        active={selected === ""}
        onClick={() => handleClick("/")}
      >
        <!-- <DemoIcon slot="media" /> -->
      </MenuListItem>
      <MenuListItem title="All recipes" active={selected === "demo"} onClick={() => handleClick("/demo")}>
        <!-- <DemoIcon slot="media" /> -->
      </MenuListItem>
      <MenuListItem title="Settings" active={selected === "settings"} onClick={() => handleClick("/")}>
        <!-- <DemoIcon slot="media" /> -->
      </MenuListItem>
    </MenuList>
  {:else}
    <MenuList class="menu-list" style="padding: 0; margin: 0; opacity: 0; z-index: -1;">
      <MenuListItem title="Coffee beans">
        <!-- <DemoIcon slot="media" /> -->
      </MenuListItem>
      <MenuListItem title="All recipes">
        <!-- <DemoIcon slot="media" /> -->
      </MenuListItem>
      <MenuListItem title="Settings">
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
