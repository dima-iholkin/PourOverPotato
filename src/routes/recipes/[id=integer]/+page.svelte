<script lang="ts">
  import { onMount } from "svelte";
  import { goto, beforeNavigate } from "$app/navigation";
  import { getCoffeeBeansById } from "$lib/database/manageCoffeeBeans";
  import {
    getRecipeById,
    hardDeleteRecipeById,
    softDeleteRecipeById,
    undoSoftDeleteRecipeById
  } from "$lib/database/manageRecipes";
  import { routes } from "$lib/domain/constants/routes";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { Recipe } from "$lib/domain/entities/Recipe";
  import Loading from "$lib/UI/domainComponents/lists/Loading.svelte";
  import DropdownMenu from "$lib/UI/genericComponents/dropdownMenu/DropdownMenu.svelte";
  import DropdownMenuItem from "$lib/UI/genericComponents/dropdownMenu/DropdownMenuItem.svelte";
  import FlexRow from "$lib/UI/genericComponents/FlexRow.svelte";
  import DeleteConfirmationModal from "$lib/UI/genericComponents/modals/DeleteConfirmationModal.svelte";
  import { addToastWithUndo } from "$lib/UI/genericComponents/toasts/toastProvider";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import EditRecipeForm from "$lib/UI/pageComponents/recipeId/EditRecipeForm.svelte";
  import type { PageData } from "./$types";

  // Load function:
  export let data: PageData;

  // Bind functions:
  let bind_setDeleteModalState: (state: "open" | "closed") => void;
  let bind_setDropdownState: (state: "open" | "closed") => void;

  // Entities state:
  let recipe: Recipe | undefined | null = null;

  // Calculated state:
  let ignoreUnsavedChanges: boolean = false;

  // Unsaved changes state:
  let bind_hasUnsavedChanges: boolean;

  // Lifecycle:

  beforeNavigate((navigation) => {
    if (navigation.willUnload === false && ignoreUnsavedChanges === false && bind_hasUnsavedChanges) {
      const navigate = confirm("Do you want to navigate away and lose unsaved changes?");
      if (navigate === false) {
        navigation.cancel();
      }
    }
  });

  onMount(() => {
    getRecipeById(data.recipeId).then((item: Recipe | undefined) => {
      recipe = item;
    });
  });

  // Handlers:

  function handleBeforeUnload(event: BeforeUnloadEvent) {
    if (ignoreUnsavedChanges === false && bind_hasUnsavedChanges) {
      event.preventDefault(); // the modern way
      event.returnValue = ""; // the old browser way
      return "Are you sure you want to navigate away?"; // even more compatible way
    }
  }

  async function handleDeleteClick() {
    // Guard clause:
    if (recipe === undefined || recipe === null) {
      return;
    }
    // Database logic:
    const _recipe: Recipe = recipe;
    await softDeleteRecipeById(_recipe.id);
    const coffeeBeansItem: CoffeeBeans | undefined = await getCoffeeBeansById(_recipe.coffeeBeansId);
    // Show a toast:
    addToastWithUndo(
      "Recipe deleted.",
      async () => {
        await undoSoftDeleteRecipeById(_recipe.id);
        goto(routes.home).then(() =>
          coffeeBeansItem ? goto(routes.coffeeBeansItem(coffeeBeansItem.name)) : goto(routes.home)
        );
      },
      async () => {
        await hardDeleteRecipeById(_recipe.id);
      }
    );
    // Navigation logic:
    ignoreUnsavedChanges = true;
    coffeeBeansItem ? goto(routes.coffeeBeansItem(coffeeBeansItem.name)) : goto(routes.home);
  }
</script>

<svelte:head>
  <title>Edit recipe - PourOverPotato app</title>
</svelte:head>

<svelte:window on:beforeunload={handleBeforeUnload} />

<FlexRow>
  <PageHeadline>Edit recipe</PageHeadline>
  {#if recipe instanceof Recipe}
    <div class="menu-container">
      <DropdownMenu bind:setDropdownState={bind_setDropdownState}>
        <DropdownMenuItem
          slot="button"
          buttonText="Delete"
          on:click={() => {
            bind_setDropdownState("closed");
            bind_setDeleteModalState("open");
          }}
        />
        <DeleteConfirmationModal
          slot="modal"
          onDeleteClick={handleDeleteClick}
          bind:setModalState={bind_setDeleteModalState}
        >
          Please confirm you want to delete this recipe
        </DeleteConfirmationModal>
      </DropdownMenu>
    </div>
  {/if}
</FlexRow>

{#if recipe === null}
  <Loading />
{:else if recipe instanceof Recipe}
  <EditRecipeForm {recipe} bind:hasUnsavedChanges={bind_hasUnsavedChanges} />
{:else}
  <p>404</p>
  <p>Not Found</p>
{/if}

<style lang="postcss">
  .menu-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
