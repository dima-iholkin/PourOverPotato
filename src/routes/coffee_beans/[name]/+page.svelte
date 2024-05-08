<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import {
    getCoffeeBeansByName,
    hardDeleteCoffeeBeansAndRecipesById,
    softDeleteCoffeeBeansAndRecipesById,
    undoSoftDeleteCoffeeBeansAndRecipesById
  } from "$lib/database/manageCoffeeBeans";
  import { getRecipesByCoffeeBeansId } from "$lib/database/manageRecipes";
  import { routes } from "$lib/domain/constants/routes";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { sortRecipesByTimestampDesc } from "$lib/domain/helpers/sortRecipes";
  import type { Count } from "$lib/types/Count";
  import RecipeCard from "$lib/UI/domainComponents/cards/RecipeCard.svelte";
  import MyFab from "$lib/UI/domainComponents/FABs/AddRecipeFab.svelte";
  import Loading from "$lib/UI/domainComponents/lists/Loading.svelte";
  import NoItemsYetP from "$lib/UI/domainComponents/lists/NoItemsYetP.svelte";
  import { RecipesSortOrderEnum } from "$lib/UI/domainComponents/lists/SortRecipesSelect/RecipesSortOrderEnum";
  import SortRecipesSelect from "$lib/UI/domainComponents/lists/SortRecipesSelect/SortRecipesSelect.svelte";
  import DropdownMenu from "$lib/UI/genericComponents/dropdownMenu/DropdownMenu.svelte";
  import DropdownMenuItem from "$lib/UI/genericComponents/dropdownMenu/DropdownMenuItem.svelte";
  import FlexRow from "$lib/UI/genericComponents/FlexRow.svelte";
  import DeleteConfirmationModal from "$lib/UI/genericComponents/modals/DeleteConfirmationModal.svelte";
  import { addToast, addToastWithUndo } from "$lib/UI/genericComponents/toasts/toastProvider";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import type { PageData } from "./$types";
  import EditCoffeeBeansModal from "./EditCoffeeBeansModal.svelte";

  // Load function:
  export let data: PageData;

  // Bind triggers:
  let bind_setDeleteModalState: (state: "open" | "closed") => void;
  let bind_setDropdownState: (state: "open" | "closed") => void;
  let bind_setEditModalState: (state: "open" | "closed") => void;

  // Entities state:
  let coffeeBeans: CoffeeBeans | undefined | "CoffeeBeansNotFound";
  let recipes: Recipe[] | undefined;

  // UI state:
  let sortOrderValue: {
    value: RecipesSortOrderEnum;
    sortOrderFunc: (recipeA: Recipe, recipeB: Recipe) => number;
  };

  // Reactivity:

  $: {
    if (recipes) {
      recipes = recipes.sort(sortOrderValue?.sortOrderFunc ?? sortRecipesByTimestampDesc);
    }
  }

  $: {
    data;
    if (browser && window.indexedDB) {
      loadCoffeeBeansAndRecipes();
    }
  }

  // Handler:
  async function handleDeleteClick() {
    // Guard clause:
    if (coffeeBeans === undefined || coffeeBeans === "CoffeeBeansNotFound") {
      return;
    }
    // Soft delete the CoffeeBeans item and the Recipes:
    const _coffeeBeans: CoffeeBeans = coffeeBeans;
    const countSoftDeleted: Count | "CoffeeBeansNotFound" = await softDeleteCoffeeBeansAndRecipesById(_coffeeBeans.id);
    // Guard clause:
    if (countSoftDeleted === "CoffeeBeansNotFound") {
      addToast("CoffeeBeans not found in the database. Operation aborted.");
      return;
    }
    // Show a toast:
    const recipesWord = countSoftDeleted.recipesCount === 1 ? "recipe" : "recipes";
    const recipesString =
      countSoftDeleted.recipesCount > 0 ? ` and ${countSoftDeleted.recipesCount} ${recipesWord}` : "";
    addToastWithUndo(
      `Coffee beans "${_coffeeBeans.name}"` + recipesString + " deleted.",
      async () => {
        await undoSoftDeleteCoffeeBeansAndRecipesById(_coffeeBeans.id);
        goto(routes.coffeeBeansItem(_coffeeBeans.name)).then(() => goto(routes.home));
      },
      async () => {
        await hardDeleteCoffeeBeansAndRecipesById(_coffeeBeans.id);
      }
    );
    // Navigate to the CoffeeBeans page:
    goto(routes.home);
  }

  // Helper:
  async function loadCoffeeBeansAndRecipes() {
    // Load CoffeeBeans item from the DB:
    const item: CoffeeBeans | undefined = await getCoffeeBeansByName(data.coffeeBeansName);
    // Guard clause:
    if (item === undefined) {
      coffeeBeans = "CoffeeBeansNotFound";
      return;
    }
    // Set the CoffeeBeans item state entity:
    coffeeBeans = item;
    // Load Recipes for the CoffeeBeansId from the DB:
    const _recipes: Recipe[] = await getRecipesByCoffeeBeansId(coffeeBeans.id);
    // Set the Recipes state entity:
    recipes = _recipes.sort(sortRecipesByTimestampDesc);
  }
</script>

<svelte:head>
  {#if coffeeBeans === undefined}
    <title>loading... - PourOverPotato app</title>
  {:else if coffeeBeans === "CoffeeBeansNotFound"}
    <title>404 Not Found - PourOverPotato app</title>
  {:else}
    <title>{coffeeBeans.name} - PourOverPotato app</title>
  {/if}
</svelte:head>

{#if coffeeBeans === undefined}
  <div class="loading-position">
    <Loading />
  </div>
{:else if coffeeBeans === "CoffeeBeansNotFound"}
  <div class="loading-position">
    <h1>404</h1>
    <p>Coffee beans not found.</p>
  </div>
{:else}
  <FlexRow>
    <PageHeadline>{coffeeBeans.name}</PageHeadline>
    <div class="menu-container">
      <button class="edit-button" type="button" on:click={() => bind_setEditModalState("open")}> Edit </button>
      <EditCoffeeBeansModal item={coffeeBeans} bind:setModalState={bind_setEditModalState} />
      <DropdownMenu bind:setDropdownState={bind_setDropdownState}>
        <DropdownMenuItem
          slot="button"
          buttonText="Delete"
          on:click={() => {
            bind_setDeleteModalState("open");
            bind_setDropdownState("closed");
          }}
        />
        <DeleteConfirmationModal
          slot="modal"
          onDeleteClick={handleDeleteClick}
          bind:setModalState={bind_setDeleteModalState}
        >
          <p>Please confirm you want to delete these coffee beans.</p>
          <p>The dependent recipes will be deleted too.</p>
        </DeleteConfirmationModal>
      </DropdownMenu>
    </div>
  </FlexRow>
  <p class="coffee-beans-description">{coffeeBeans.description}</p>
  {#if recipes === undefined}
    <Loading />
  {:else if recipes.length === 0}
    <NoItemsYetP />
  {:else}
    <SortRecipesSelect bind:sortOrderValue />
    {#each recipes as recipe (recipe.id)}
      <RecipeCard coffeeBeansName={coffeeBeans.name} href={routes.recipeItem(recipe.id)} {recipe} />
    {/each}
  {/if}
  <MyFab href={routes.addRecipe(coffeeBeans.name)} />
{/if}

<style lang="postcss">
  .loading-position {
    margin-top: 1rem;
  }

  .menu-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3rem;
  }

  .coffee-beans-description {
    margin-top: 0.25rem;
    margin-bottom: 1rem;

    white-space: pre-line;
  }

  .edit-button {
    @apply text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4;
    @apply focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800;
    @apply dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600;
    @apply dark:focus:ring-gray-700;
  }
</style>
