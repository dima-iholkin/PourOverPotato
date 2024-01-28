<script lang="ts">
  import { onMount } from "svelte";
  import { devFillDB } from "../../database/devData/devFillDB";
  const { MODE } = import.meta.env;

  // Handler functions:

  async function handleInitDevDB() {
    if (MODE === "development") {
      await devFillDB();

      setTimeout(() => location.reload(), 1000);

      alert("Dev DB filled.");
    }
  }
</script>

<h1>Settings</h1>

{#if MODE === "development"}
  <button style="border: solid orange;" on:click={handleInitDevDB}>Initialize dev DB</button>
{/if}
