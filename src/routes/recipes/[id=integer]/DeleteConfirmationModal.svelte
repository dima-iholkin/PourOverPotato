<script lang="ts">
  import { deleteRecipeById, getCoffeeBeansById } from "$lib/database/v1/indexedDB";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { routes } from "$lib/domain/routes";
  import Modal from "$lib/UI/utility-components/modals/Modal.svelte";

  // Triggers:

  export const setState = (state: "open" | "closed") => {
    bindSetState_(state);
  };

  // Bind functions:

  let bindSetState_: (state: "open" | "closed") => void;

  // Entities props:

  export let recipeItem: Recipe;

  // Handlers:

  function handleDeleteClick() {
    deleteRecipeById(recipeItem.id)
      .then(() => {
        return getCoffeeBeansById(recipeItem.coffeeBeansId);
      })
      .then((coffeeBeansItem: CoffeeBeans | undefined) => {
        bindSetState_("closed");
        if (coffeeBeansItem instanceof CoffeeBeans) {
          window.location.replace(routes.coffeeBeansItem(coffeeBeansItem.name));
        } else {
          window.location.replace(routes.home);
        }
        alert("Recipe deleted.");
      });
  }
</script>

<Modal title="Confirmation" bind:setState={bindSetState_}>
  <div class="text-container">
    <p>Please confirm you want to delete this recipe.</p>
  </div>
  <div class="buttons-container">
    <button class="button-delete" type="button" on:click={handleDeleteClick}> Delete </button>
    <button class="button-cancel" type="button" on:click={() => bindSetState_("closed")}> Cancel </button>
  </div>
</Modal>

<style lang="postcss">
  .text-container {
    margin-top: 1rem;
  }

  p {
    text-align: center;
  }

  .buttons-container {
    margin-top: 1rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5rem;
  }

  .button-delete {
    @apply text-red-700 border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-red-800 focus:ring-red-300 focus:ring-4 focus:outline-none;
    @apply dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900;
  }

  .button-cancel {
    @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm;
    @apply px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800;
  }
</style>
