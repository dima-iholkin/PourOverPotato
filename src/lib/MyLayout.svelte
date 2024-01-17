<script lang="ts">
  import { App } from "konsta/svelte";
  import "../app.css";
  import { SvelteUIProvider, AppShell } from "@svelteuidev/core";
</script>

<App theme="material">
  <slot />
</App>
