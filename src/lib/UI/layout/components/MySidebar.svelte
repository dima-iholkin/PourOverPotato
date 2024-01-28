<script lang="ts">
  import { MenuList, MenuListItem } from "konsta/svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  export let hidden: Boolean = false;

  $: selected = $page.route.id ?? "";

  function handleClick(route: string) {
    goto(route);
  }
</script>

<div>
  {#if hidden === false}
    <MenuList class="menu-list" style="padding: 0; margin: 0; position: fixed;">
      <a href="/">
        <MenuListItem title="Coffee beans" active={selected === "/" || selected === "/beans"} />
      </a>
      <a href="/recipes">
        <MenuListItem title="All recipes" active={selected === "/recipes"} />
      </a>
      <a href="/settings">
        <MenuListItem title="Settings" active={selected === "/settings"} />
      </a>
    </MenuList>
  {:else}
    <MenuList class="menu-list" style="padding: 0; margin: 0; opacity: 0; z-index: -1;">
      <MenuListItem title="Coffee beans" />
      <MenuListItem title="All recipes" />
      <MenuListItem title="Settings" />
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
