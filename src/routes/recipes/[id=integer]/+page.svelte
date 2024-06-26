<script context="module" lang="ts">
  const RECIPE_TARGET = "recipe-target";
  const RECIPE_RESULT = "recipe-result";
  const RECIPE_THOUGHTS = "recipe-thoughts";
  const OUT_WEIGHT = "out-weight";
  const RATING = "rating";
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { goto, beforeNavigate } from "$app/navigation";
  import { getAllCoffeeBeans, getCoffeeBeansById } from "$lib/database/manageCoffeeBeans";
  import {
    editRecipe,
    getRecipeById,
    hardDeleteRecipeById,
    softDeleteRecipeById,
    undoSoftDeleteRecipeById
  } from "$lib/database/manageRecipes";
  import { naming } from "$lib/domain/constants/naming";
  import { routes } from "$lib/domain/constants/routes";
  import { placeholders } from "$lib/domain/constants/strings";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { Recipe } from "$lib/domain/entities/Recipe";
  import { formatTimeForInput, parseDateFromInputString } from "$lib/helpers/dateHelpers";
  import CoffeeBeansSelect from "$lib/UI/domainComponents/forms/CoffeeBeansSelect.svelte";
  import FavoriteCheckbox from "$lib/UI/domainComponents/forms/FavoriteCheckbox.svelte";
  import TimestampPicker from "$lib/UI/domainComponents/forms/TimestampPicker.svelte";
  import Loading from "$lib/UI/domainComponents/lists/Loading.svelte";
  import DropdownMenu from "$lib/UI/genericComponents/dropdownMenu/DropdownMenu.svelte";
  import DropdownMenuItem from "$lib/UI/genericComponents/dropdownMenu/DropdownMenuItem.svelte";
  import FlexRow from "$lib/UI/genericComponents/FlexRow.svelte";
  import NumberInput from "$lib/UI/genericComponents/forms/NumberInput.svelte";
  import Textarea from "$lib/UI/genericComponents/forms/Textarea.svelte";
  import DeleteConfirmationModal from "$lib/UI/genericComponents/modals/DeleteConfirmationModal.svelte";
  import { addToast, addToastWithUndo } from "$lib/UI/genericComponents/toasts/toastProvider";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import type { PageData } from "./$types";

  // Load function:
  export let data: PageData;

  // Bind functions:
  let bind_setDeleteModalState: (state: "open" | "closed") => void;
  let bind_setDropdownState: (state: "open" | "closed") => void;

  // Entities state:
  let recipe: Recipe | undefined | null = null;
  let allCoffeeBeans: CoffeeBeans[] | undefined = undefined;
  let ignoreUnsavedChanges: boolean = false;

  // Form state:
  let selectedCoffeeBeansId: number | undefined = undefined;
  let recipeTarget: string;
  let recipeResult: string;
  let recipeThoughts: string;
  let outWeight: number;
  let rating: number;
  let favorite: boolean = false;
  let timestampStr: string;

  // Unsaved changes state:
  let hasUnsavedChanges: boolean = false;

  // Unsaved changes reactivity:
  $: if (
    recipe &&
    selectedCoffeeBeansId === recipe.coffeeBeansId &&
    recipeTarget === recipe.recipeTarget &&
    recipeResult === recipe.recipeResult &&
    recipeThoughts === recipe.recipeThoughts &&
    outWeight === recipe.outWeight &&
    rating === recipe.rating &&
    favorite === recipe.favorite &&
    timestampStr === formatTimeForInput(recipe.timestamp)
  ) {
    hasUnsavedChanges = false;
  } else {
    hasUnsavedChanges = true;
  }

  // Lifecycle:

  beforeNavigate((navigation) => {
    if (navigation.willUnload === false && ignoreUnsavedChanges === false && hasUnsavedChanges) {
      const navigate = confirm("Do you want to navigate away and lose unsaved changes?");
      if (navigate === false) {
        navigation.cancel();
      }
    }
  });

  onMount(() => {
    getRecipeById(data.recipeId).then((item: Recipe | undefined) => {
      recipe = item;
      if (item === undefined) {
        return;
      }
      getAllCoffeeBeans().then((items: CoffeeBeans[]) => {
        allCoffeeBeans = items;
        selectedCoffeeBeansId = item.coffeeBeansId;
        recipeTarget = item.recipeTarget;
        recipeResult = item.recipeResult;
        recipeThoughts = item.recipeThoughts;
        outWeight = item.outWeight;
        rating = item.rating;
        favorite = item.favorite;
        timestampStr = formatTimeForInput(item.timestamp);
      });
    });
  });

  // Handlers:

  function handleBeforeUnload(event: BeforeUnloadEvent) {
    if (ignoreUnsavedChanges === false && hasUnsavedChanges) {
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

  async function handleSubmit() {
    // Validate and format the form values:
    recipeTarget = recipeTarget.trim();
    recipeResult = recipeResult.trim();
    recipeThoughts = recipeThoughts.trim();
    const timestamp: Date = parseDateFromInputString(timestampStr);
    // Null guards:
    if (selectedCoffeeBeansId === undefined) {
      throw new Error("Please select the coffee beans.");
    }
    if (recipe === undefined || recipe === null) {
      throw new Error("Recipe was undefined or null somehow.");
    }
    // Database logic:
    const recipeEdited: Recipe = new Recipe({
      id: recipe.id,
      coffeeBeansId: selectedCoffeeBeansId,
      recipeTarget: recipeTarget,
      recipeResult: recipeResult,
      recipeThoughts: recipeThoughts,
      outWeight: outWeight,
      rating: rating,
      favorite: favorite,
      timestamp: timestamp
    });
    await editRecipe(recipeEdited);
    // Show a toast:
    addToast("Recipe modified.");
    // Navigation logic:
    ignoreUnsavedChanges = true;
    const coffeeBeansItem: CoffeeBeans | undefined = allCoffeeBeans?.find((item) => item.id === selectedCoffeeBeansId);
    // Redirect user to another page:
    if (coffeeBeansItem === undefined) {
      goto(routes.home);
      return;
    }
    goto(routes.coffeeBeansItem(coffeeBeansItem.name));
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
  <form id="edit-recipe" on:submit|preventDefault={handleSubmit}>
    <CoffeeBeansSelect
      {allCoffeeBeans}
      initialCoffeeBeansId={recipe.coffeeBeansId}
      showAddButton={false}
      bind:selectedCoffeeBeansId
    />
    <Textarea
      id={RECIPE_TARGET}
      initialValue={recipe.recipeTarget}
      label={naming.recipe.recipeTarget + ":"}
      name={RECIPE_TARGET}
      placeholder={placeholders.recipeTarget}
      bind:value={recipeTarget}
    />
    <Textarea
      id={RECIPE_RESULT}
      initialValue={recipe.recipeResult}
      label={naming.recipe.recipeResult + ":"}
      name={RECIPE_RESULT}
      placeholder={placeholders.recipeResult}
      bind:value={recipeResult}
    />
    <NumberInput
      initialValue={recipe.outWeight}
      labelText="{naming.recipe.outWeight} (g):"
      min={0}
      nameAttr={OUT_WEIGHT}
      step={5}
      bind:value={outWeight}
    />
    <NumberInput
      initialValue={recipe.rating}
      labelText="Rating:"
      max={5}
      min={0}
      nameAttr={RATING}
      step={0.5}
      bind:value={rating}
    />
    <FavoriteCheckbox initialValue={recipe.favorite} bind:value={favorite} />
    <Textarea
      id={RECIPE_THOUGHTS}
      initialValue={recipe.recipeThoughts}
      label={naming.recipe.recipeThoughts + ":"}
      name={RECIPE_THOUGHTS}
      placeholder={placeholders.recipeThoughts}
      bind:value={recipeThoughts}
    />
    <TimestampPicker initialValue={formatTimeForInput(recipe.timestamp)} bind:value={timestampStr} />
    <button class="my-button" disabled={hasUnsavedChanges === false} form="edit-recipe" type="submit">
      Save changes
    </button>
  </form>
{:else}
  <p>404</p>
  <p>Not Found</p>
{/if}

<style lang="postcss">
  form {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  .my-button {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
    width: 100%;
    margin-bottom: 16px;
  }

  .my-button:disabled {
    @apply bg-gray-300;
  }

  .menu-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
