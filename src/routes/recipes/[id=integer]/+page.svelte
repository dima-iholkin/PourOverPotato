<script context="module" lang="ts">
  const RECIPE_TARGET = "recipe-target";
  const RECIPE_TARGET_PH = "Example: 17 clicks, 15g + 260g. 5m boil.";
  const RECIPE_RESULT = "recipe-result";
  const RECIPE_RESULT_PH = "Example: 2m15s + 15s drip. 250g out.";
  const RECIPE_THOUGHTS = "recipe-thoughts";
  const RECIPE_THOUGHTS_PH = "Example: Perfect balance. Perfect concentration. Flowery notes.";
  const OUT_WEIGHT = "out-weight";
  const RATING = "rating";
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import {
    deleteRecipeById,
    editRecipe,
    getAllCoffeeBeans,
    getCoffeeBeansById,
    getRecipeById
  } from "$lib/database/v1/indexedDB";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { Recipe } from "$lib/domain/entities/Recipe";
  import { naming } from "$lib/domain/naming";
  import { routes } from "$lib/domain/routes";
  import { formatTimeForInput, parseDateFromInputString } from "$lib/helpers/dateHelpers";
  import CoffeeBeansSelect from "$lib/UI/domain-components/forms/CoffeeBeansSelect.svelte";
  import TimestampPicker from "$lib/UI/domain-components/forms/TimestampPicker.svelte";
  import Loading from "$lib/UI/domain-components/lists/Loading.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import DropdownMenu from "$lib/UI/utility-components/dropdownMenu/DropdownMenu.svelte";
  import DropdownMenuItem from "$lib/UI/utility-components/dropdownMenu/DropdownMenuItem.svelte";
  import FlexRow from "$lib/UI/utility-components/FlexRow.svelte";
  import NumberInput from "$lib/UI/utility-components/forms/NumberInput.svelte";
  import Textarea from "$lib/UI/utility-components/forms/Textarea.svelte";
  import DeleteConfirmationModal from "$lib/UI/utility-components/modals/DeleteConfirmationModal.svelte";
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
    await deleteRecipeById(recipe!.id);
    alert("Recipe deleted.");

    const coffeeBeansItem: CoffeeBeans | undefined = await getCoffeeBeansById(recipe!.coffeeBeansId);
    if (coffeeBeansItem === undefined) {
      window.location.replace(routes.home);
      return;
    }
    window.location.replace(routes.coffeeBeansItem(coffeeBeansItem.name));
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

    // Refresh the page to see the updated data:

    alert("Recipe saved.");

    const coffeeBeansItem: CoffeeBeans | undefined = allCoffeeBeans?.find((item) => item.id === selectedCoffeeBeansId);
    if (coffeeBeansItem === undefined) {
      window.location.replace(routes.home);
      return;
    }
    window.location.replace(routes.coffeeBeansItem(coffeeBeansItem.name));
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
          slot="li"
          buttonText="Delete"
          on:click={() => {
            bind_setDropdownState("closed");
            bind_setDeleteModalState("open");
          }}
        />
        <DeleteConfirmationModal
          slot="modal"
          onDeleteClick={handleDeleteClick}
          text="Please confirm you want to delete this recipe."
          bind:setModalState={bind_setDeleteModalState}
        />
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
      placeholder={RECIPE_TARGET_PH}
      bind:value={recipeTarget}
    />

    <Textarea
      id={RECIPE_RESULT}
      label={naming.recipe.recipeResult + ":"}
      name={RECIPE_RESULT}
      placeholder={RECIPE_RESULT_PH}
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
      placeholder={RECIPE_THOUGHTS_PH}
      textLinesCount={4}
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
