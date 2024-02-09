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
  import { editRecipe, getAllCoffeeBeans, getRecipeById } from "$lib/database/v1/indexedDB";
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { Recipe } from "$lib/domain/entities/Recipe";
  import { naming } from "$lib/domain/naming";
  import { routes } from "$lib/domain/routes";
  import { formatTimeForInput, parseDateFromInputString } from "$lib/helpers/dateHelpers";
  import CoffeeBeansSelect from "$lib/UI/domain-components/forms/CoffeeBeansSelect.svelte";
  import TimestampPicker from "$lib/UI/domain-components/forms/TimestampPicker.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import FlexRow from "$lib/UI/utility-components/FlexRow.svelte";
  import Label from "$lib/UI/utility-components/forms/Label.svelte";
  import NumberInput from "$lib/UI/utility-components/forms/NumberInput.svelte";
  import Textarea from "$lib/UI/utility-components/forms/Textarea.svelte";
  import type { PageData } from "./$types";
  import DropdownMenu from "./DropdownMenu.svelte";

  // From load function:

  export let data: PageData;

  // State entities:

  let recipe: Recipe | undefined | null = null;

  let allCoffeeBeans: CoffeeBeans[] | undefined = undefined;

  // State form:

  let selectedCoffeeBeans: CoffeeBeans | undefined = undefined;

  let recipeTarget: string;
  let recipeResult: string;
  let recipeThoughts: string;
  let outWeight: number;
  let rating: number;
  let timestampStr: string;

  // Lifecycle hooks:

  onMount(() => {
    getRecipeById(data.recipeId).then((item: Recipe | undefined) => {
      recipe = item;

      if (item === undefined) {
        return;
      }

      getAllCoffeeBeans().then((items: CoffeeBeans[]) => {
        allCoffeeBeans = items;
        selectedCoffeeBeans = allCoffeeBeans?.find((_item) => _item.id === item.coffeeBeansId);
      });

      recipeTarget = item.recipeTarget;
      recipeResult = item.recipeResult;
      recipeThoughts = item.recipeThoughts;
      outWeight = item.outWeight;
      rating = item.rating;
      timestampStr = formatTimeForInput(item.timestamp);
    });
  });

  // Handler functions:

  async function handleSubmit() {
    // Deal with the 3 textarea inputs:

    recipeTarget = recipeTarget.trim();
    recipeResult = recipeResult.trim();
    recipeThoughts = recipeThoughts.trim();

    // Deal with the timestamp:

    const timestamp: Date = parseDateFromInputString(timestampStr);

    // Null guards:

    if (recipe === undefined || recipe === null) {
      throw new Error("Recipe was undefined or null somehow.");
    }

    if (selectedCoffeeBeans === undefined) {
      throw new Error("Please select the coffee beans.");
    }

    // Save the new recipe:

    const recipeSubmit: Recipe = new Recipe(
      {
        coffeeBeansId: selectedCoffeeBeans.id,
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

    alert("We saved the recipe successfully.");

    window.location.replace(routes.coffeeBeansItem(selectedCoffeeBeans.name));
  }
</script>

<svelte:head>
  <title>Edit recipe - PourOverPotato app</title>
</svelte:head>

<FlexRow>
  <PageHeadline>Edit recipe</PageHeadline>
  {#if recipe instanceof Recipe}
    <div class="menu-container">
      <DropdownMenu recipeItem={recipe} />
    </div>
  {/if}
</FlexRow>

{#if recipe === null}
  <p>loading...</p>
{:else if recipe instanceof Recipe}
  <form id="edit-recipe" on:submit|preventDefault={handleSubmit}>
    {#if selectedCoffeeBeans !== undefined}
      <div>
        <CoffeeBeansSelect {allCoffeeBeans} showAddButton={false} bind:selectedCoffeeBeans />
      </div>
    {/if}

    <div>
      <Label for_={RECIPE_TARGET}>{naming.recipe.recipeTarget}:</Label>
    </div>
    <div>
      <Textarea id={RECIPE_TARGET} name={RECIPE_TARGET} placeholder={RECIPE_TARGET_PH} bind:value={recipeTarget} />
    </div>

    <div>
      <Label for_={RECIPE_RESULT}>{naming.recipe.recipeResult}:</Label>
    </div>
    <div>
      <Textarea id={RECIPE_RESULT} name={RECIPE_RESULT} placeholder={RECIPE_RESULT_PH} bind:value={recipeResult} />
    </div>

    <div>
      <NumberInput
        labelText="{naming.recipe.outWeight} (g):"
        min={0}
        nameAttr={OUT_WEIGHT}
        step={5}
        bind:value={outWeight}
      />
    </div>

    <div>
      <NumberInput labelText="Rating:" max={5} min={0} nameAttr={RATING} step={0.5} bind:value={rating} />
    </div>

    <div>
      <Label for_={RECIPE_THOUGHTS}>{naming.recipe.recipeThoughts}:</Label>
    </div>
    <div>
      <Textarea
        id={RECIPE_THOUGHTS}
        name={RECIPE_THOUGHTS}
        placeholder={RECIPE_THOUGHTS_PH}
        textLinesCount={4}
        bind:value={recipeThoughts}
      />
    </div>

    <div>
      <TimestampPicker bind:value={timestampStr} />
    </div>

    <button class="my-button" form="edit-recipe" type="submit"> Save changes </button>
  </form>
{:else}
  <p>404 Not Found</p>
{/if}

<style lang="postcss">
  div {
    margin-bottom: 8px;
  }

  button {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .my-button {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }

  .menu-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
