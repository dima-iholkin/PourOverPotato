<script lang="ts">
  import MyLayout from "$lib/MyLayout.svelte";
  import { onMount } from "svelte";
  import { createDemoDB, addCoffeeBeans } from "../database/indexedDB";

  onMount(() => {
    const demoCoffeeBeans: CoffeeBeans = {
      id: 999,
      name: "Rwanda Mabanza",
      details: "Filter roast. Washed process. Dark plum, burned cherry notes."
    };

    createDemoDB().then(() => addCoffeeBeans(demoCoffeeBeans));
  });
</script>

<MyLayout>
  <slot />
</MyLayout>
