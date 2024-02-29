<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import {
    deleteCoffeeBeansById,
    deleteRecipesByCoffeeBeansId,
    getCoffeeBeansByName,
    getRecipesByCoffeeBeansId
  } from "$lib/database/current/indexedDB";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { sortRecipesByTimestampDesc } from "$lib/domain/helpers/sortRecipes";
  import { routes } from "$lib/domain/routes";
  import RecipeCard from "$lib/UI/domain-components/cards/RecipeCard.svelte";
  import MyFab from "$lib/UI/domain-components/FABs/AddRecipeFab.svelte";
  import Loading from "$lib/UI/domain-components/lists/Loading.svelte";
  import NoItemsYetP from "$lib/UI/domain-components/lists/NoItemsYetP.svelte";
  import { RecipesSortOrderEnum } from "$lib/UI/domain-components/lists/SortRecipesSelect/RecipesSortOrderEnum";
  import SortRecipesSelect from "$lib/UI/domain-components/lists/SortRecipesSelect/SortRecipesSelect.svelte";
  import DropdownMenu from "$lib/UI/generic-components/dropdownMenu/DropdownMenu.svelte";
  import DropdownMenuItem from "$lib/UI/generic-components/dropdownMenu/DropdownMenuItem.svelte";
  import FlexRow from "$lib/UI/generic-components/FlexRow.svelte";
  import DeleteConfirmationModal from "$lib/UI/generic-components/modals/DeleteConfirmationModal.svelte";
  import { addToast } from "$lib/UI/generic-components/toasts/toastProvider";
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

  // Reactivity:

  $: {
    data;
    if (browser && window.indexedDB) {
      loadCoffeeBeans();
    }
  }

  // Handlers:

  async function handleDeleteClick() {
    if (coffeeBeans instanceof CoffeeBeans) {
      const countRecipesDeleted: number = await deleteRecipesByCoffeeBeansId(coffeeBeans.id);
      await deleteCoffeeBeansById(coffeeBeans.id);
      goto(routes.home);
      const recipes = countRecipesDeleted === 1 ? "recipe" : "recipes";
      const recipesPart = countRecipesDeleted > 0 ? ` and ${countRecipesDeleted} ${recipes}` : "";
      addToast(`Coffee beans "${coffeeBeans.name}"` + recipesPart + " deleted.");
    }
  }

  function handleSortOrderChange(
    value: RecipesSortOrderEnum,
    sortOrderFunc: (recipeA: Recipe, recipeB: Recipe) => number
  ) {
    recipes = recipes!.sort(sortOrderFunc);
  }

  // Helpers:

  async function loadCoffeeBeans() {
    const item: CoffeeBeans | undefined = await getCoffeeBeansByName(data.coffeeBeansName);
    if (item === undefined) {
      coffeeBeans = "CoffeeBeansNotFound";
      return;
    }
    coffeeBeans = item;
    const _recipes: Recipe[] = await getRecipesByCoffeeBeansId(coffeeBeans.id);
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
    <SortRecipesSelect onChange={handleSortOrderChange} />
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
