<script lang="ts">
  import { onMount } from "svelte";
  import { devFillDB } from "$lib/database/v1/devData/devFillDB";
  import { anyCoffeeBeansSaved, anyRecipesSaved } from "$lib/database/v1/indexedDB";
  import { routes } from "$lib/domain/routes";

  // State:

  let anyCoffeeBeans: boolean = true;
  let anyRecipes: boolean = true;

  // Lifecycle:

  onMount(() => {
    anyCoffeeBeansSaved().then((value: boolean) => {
      anyCoffeeBeans = value;
    });

    anyRecipesSaved().then((value: boolean) => {
      anyRecipes = value;
    });
  });

  // Handler functions:

  function handleAddDemoCoffeeBeans() {
    devFillDB().then(() => {
      location.replace(routes.home);
      alert("Added demo coffee beans and recipes.");
    });
  }
</script>

{#if anyCoffeeBeans === false && anyRecipes === false}
  <div class="empty-db-message-container">
    <p>You have no coffee beans or recipes added yet...</p>
    <p>Would you like to add 3 demo coffee beans with their demo recipes?</p>
    <button class="add-demo-coffee-beans" on:click={handleAddDemoCoffeeBeans} type="button">
      Add demo coffee beans and recipes
    </button>
  </div>
{:else}
  <p class="no-items-yet">No items added yet...</p>
{/if}

<style lang="postcss">
  .empty-db-message-container {
    text-align: center;
  }

  .add-demo-coffee-beans {
    @apply text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4;
    @apply focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400;
    @apply dark:focus:ring-yellow-900;

    margin-top: 1rem;
  }

  .no-items-yet {
    text-align: center;
  }
</style>
