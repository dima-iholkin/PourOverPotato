<script lang="ts">
  import { onMount } from "svelte";
  import { devFillDB } from "$lib/database/current/devData/devFillDB";
  import { anyCoffeeBeansSaved, anyRecipesSaved } from "$lib/database/current/indexedDB";
  import { addToast } from "$lib/UI/generic-components/toasts/toastProvider";
  import NoItemsYetP from "../lists/NoItemsYetP.svelte";

  // Events:

  export let onAddDemoEntities: () => void;

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

  function handleAddDemoEntities() {
    devFillDB().then(() => {
      addToast("Demo coffee beans and demo recipes added.");
      onAddDemoEntities();
    });
  }
</script>

{#if anyCoffeeBeans === false && anyRecipes === false}
  <div class="empty-db-message-container">
    <p>You have no coffee beans or recipes added yet...</p>
    <p>Would you like to add 3 demo coffee beans and recipes?</p>
    <button class="add-demo-coffee-beans" type="button" on:click={handleAddDemoEntities}>
      Add demo coffee beans and recipes
    </button>
  </div>
{:else}
  <NoItemsYetP />
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
</style>
