<script context="module" lang="ts">
  const RECIPE_TARGET = "recipe-target";
  const RECIPE_RESULT = "recipe-result";
  const RECIPE_THOUGHTS = "recipe-thoughts";
  const OUT_WEIGHT = "out-weight";
  const RATING = "rating";
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {
    deleteRecipeById,
    editRecipe,
    getAllCoffeeBeans,
    getCoffeeBeansById,
    getRecipeById,
    undoDeleteRecipe
  } from "$lib/database/current/indexedDB";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { Recipe } from "$lib/domain/entities/Recipe";
  import { naming } from "$lib/domain/naming";
  import { routes } from "$lib/domain/routes";
  import { placeholders } from "$lib/domain/strings";
  import { formatTimeForInput, parseDateFromInputString } from "$lib/helpers/dateHelpers";
  import CoffeeBeansSelect from "$lib/UI/domain-components/forms/CoffeeBeansSelect.svelte";
  import TimestampPicker from "$lib/UI/domain-components/forms/TimestampPicker.svelte";
  import Loading from "$lib/UI/domain-components/lists/Loading.svelte";
  import DropdownMenu from "$lib/UI/generic-components/dropdownMenu/DropdownMenu.svelte";
  import DropdownMenuItem from "$lib/UI/generic-components/dropdownMenu/DropdownMenuItem.svelte";
  import FlexRow from "$lib/UI/generic-components/FlexRow.svelte";
  import NumberInput from "$lib/UI/generic-components/forms/NumberInput.svelte";
  import Textarea from "$lib/UI/generic-components/forms/Textarea.svelte";
  import DeleteConfirmationModal from "$lib/UI/generic-components/modals/DeleteConfirmationModal.svelte";
  import { addToast, addUndoToast } from "$lib/UI/generic-components/toasts/toastProvider";
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

  // Form state:

  let selectedCoffeeBeansId: number | undefined = undefined;
  let recipeTarget: string;
  let recipeResult: string;
  let recipeThoughts: string;
  let outWeight: number;
  let rating: number;
  let timestampStr: string;

  // Lifecycle:

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
        timestampStr = formatTimeForInput(item.timestamp);
      });
    });
  });

  // Handler functions:

  async function handleDeleteClick() {
    if (recipe === undefined || recipe === null) {
      return;
    }

    const _recipe: Recipe = recipe;
    await deleteRecipeById(_recipe.id, true, _recipe);
    const coffeeBeansItem: CoffeeBeans | undefined = await getCoffeeBeansById(_recipe.coffeeBeansId);
    addUndoToast(
      "Recipe deleted.",
      async () => {
        await undoDeleteRecipe(_recipe);
        goto(routes.home).then(() =>
          coffeeBeansItem ? goto(routes.coffeeBeansItem(coffeeBeansItem.name)) : goto(routes.home)
        );
      },
      async () => {
        await deleteRecipeById(_recipe.id);
      }
    );

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

    // Save the new recipe:

    const recipeSubmit: Recipe = new Recipe(
      {
        coffeeBeansId: selectedCoffeeBeansId,
        recipeTarget: recipeTarget,
        recipeResult: recipeResult,
        recipeThoughts: recipeThoughts,
        outWeight: outWeight,
        rating: rating,
        timestamp: timestamp
      },
      recipe.id
    );
    await editRecipe(recipeSubmit);

    addToast("Recipe changes saved.");

    const coffeeBeansItem: CoffeeBeans | undefined = allCoffeeBeans?.find((item) => item.id === selectedCoffeeBeansId);
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
    <CoffeeBeansSelect {allCoffeeBeans} showAddButton={false} bind:selectedCoffeeBeansId />

    <Textarea
      id={RECIPE_TARGET}
      label={naming.recipe.recipeTarget + ":"}
      name={RECIPE_TARGET}
      placeholder={placeholders.recipeTarget}
      bind:value={recipeTarget}
    />

    <Textarea
      id={RECIPE_RESULT}
      label={naming.recipe.recipeResult + ":"}
      name={RECIPE_RESULT}
      placeholder={placeholders.recipeResult}
      bind:value={recipeResult}
    />

    <NumberInput
      labelText="{naming.recipe.outWeight} (g):"
      min={0}
      nameAttr={OUT_WEIGHT}
      step={5}
      bind:value={outWeight}
    />

    <NumberInput labelText="Rating:" max={5} min={0} nameAttr={RATING} step={0.5} bind:value={rating} />

    <Textarea
      id={RECIPE_THOUGHTS}
      label={naming.recipe.recipeThoughts + ":"}
      name={RECIPE_THOUGHTS}
      placeholder={placeholders.recipeThoughts}
      bind:value={recipeThoughts}
    />

    <TimestampPicker bind:value={timestampStr} />

    <button class="my-button" form="edit-recipe" type="submit"> Save changes </button>
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

  .menu-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
