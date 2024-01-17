<script lang="ts">
  import { Burger, Header } from "@svelteuidev/core";
  import MyHeader from "$lib/MyHeader.svelte";
</script>

<Header slot="header" height={65} style="display: flex; justify-content: space-between;" fixed>
  <!-- Navbar burger icon goes here. Toggle hidden state based on the variable "opened". -->

  <!-- <MenuBurgerIcon show={true} menuOpen={false} /> -->

  <h3>PourOverPotato</h3>
  <div><p>Login</p></div>
</Header>
