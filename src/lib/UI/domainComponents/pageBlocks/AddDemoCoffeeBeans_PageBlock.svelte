<script lang="ts">
  import { onMount } from "svelte";
  import { anyCoffeeBeans } from "$lib/database/coffeeBeansAPI";
  import { fillDbWithDemoData } from "$lib/database/dataManagementAPI/manageDataAPI";
  import { anyRecipes } from "$lib/database/recipesAPI";
  import NoItemsYetP from "$lib/UI/domainComponents/lists/NoItemsYetP.svelte";
  import { addToast } from "$lib/UI/genericComponents/toasts/toastProvider";

  interface Props {
    onAddDemoEntities: () => void;
  }

  // Events:
  const { onAddDemoEntities }: Props = $props();

  // State:
  let _anyCoffeeBeans: boolean = $state(true);
  let _anyRecipes: boolean = $state(true);

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
    <button class="add-demo-coffee-beans" type="button" onclick={handleAddDemoEntities}>
      Add demo coffee beans and recipes
    </button>
  </div>
{:else}
  <NoItemsYetP />
{/if}

<style lang="postcss">
  @reference "tailwindcss";

  .empty-db-message-container {
    text-align: center;
  }

  .add-demo-coffee-beans {
    @apply text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4;
    @apply focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    margin-top: 1rem;
  }
</style>
