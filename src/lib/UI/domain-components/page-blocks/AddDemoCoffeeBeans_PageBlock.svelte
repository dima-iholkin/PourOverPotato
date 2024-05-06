<script lang="ts">
  import { onMount } from "svelte";
  import { anyCoffeeBeans } from "$lib/database/manageCoffeeBeans";
  import { fillDbWithDemoData } from "$lib/database/manageData";
  import { anyRecipes } from "$lib/database/manageRecipes";
  import NoItemsYetP from "$lib/UI/domain-components/lists/NoItemsYetP.svelte";
  import { addToast } from "$lib/UI/generic-components/toasts/toastProvider";

  // Events:
  export let onAddDemoEntities: () => void;

  // State:
  let _anyCoffeeBeans: boolean = true;
  let _anyRecipes: boolean = true;

  // Lifecycle:
  onMount(() => {
    anyCoffeeBeans().then((value: boolean) => {
      _anyCoffeeBeans = value;
    });
    anyRecipes().then((value: boolean) => {
      _anyRecipes = value;
    });
  });

  // Handler:
  function handleAddDemoEntities() {
    fillDbWithDemoData().then(() => {
      addToast("Demo coffee beans and recipes added.");
      onAddDemoEntities();
    });
  }
</script>

{#if _anyCoffeeBeans === false && _anyRecipes === false}
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
