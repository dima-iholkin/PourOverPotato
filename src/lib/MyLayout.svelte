<script lang="ts">
  import { SvelteUIProvider, AppShell } from "@svelteuidev/core";
</script>

<SvelteUIProvider>
  <AppShell>
    <slot />
  </AppShell>
</SvelteUIProvider>
