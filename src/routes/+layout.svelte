<script lang="ts">
  import { onMount } from "svelte";
  import { createDemoDB, addCoffeeBeans } from "../database/indexedDB";
  import { UniquenessCollisionFailure } from "../database/types/UniquenessCollisionFailure";
  import MyLayout from "$lib/MyLayout.svelte";

  onMount(() => {
    // createDemoDB()
    //   .then(() => addCoffeeBeans(demoCoffeeBeans))
    //   .then((result) => {
    //     if (result instanceof UniquenessCollisionFailure) {
    //       console.log(`It seems an item with the same "${result.propertyName}" already exist in the database.`);
    //     }
    //   });
  });
</script>

<MyLayout>
  <slot />
</MyLayout>
