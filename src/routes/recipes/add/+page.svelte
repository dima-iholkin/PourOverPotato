<script context="module" lang="ts">
  const RECIPE_TARGET = "recipe-target";
  const RECIPE_TARGET_PH = "Example: 17 clicks, 15g + 260g. 5m boil.";
  const RECIPE_RESULT = "recipe-result";
  const RECIPE_RESULT_PH = "Example: 2m15s + 15s drip. 250g out.";
  const RECIPE_THOUGHTS = "recipe-thoughts";
  const RECIPE_THOUGHTS_PH = "Example: Perfect balance. Perfect concentration. Flowery notes.";
  const OUT_WEIGHT = "out-weight";
  const RATING = "rating";

  const FORM_NAME = "addRecipe";

  const COFFEEBEANS_ID = "coffee-beans";
</script>

<script lang="ts">
  import { onMount } from "svelte";
  // import { page } from "$app/stores";
  import { addRecipe, getAllCoffeeBeans } from "$lib/database/v1/indexedDB";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { RecipeSubmit } from "$lib/domain/entities/Recipe";
  import { naming } from "$lib/domain/naming";
  import { routes } from "$lib/domain/routes";
  import { clearFormField, loadFormField, persistFormField } from "$lib/persistForms/localStorage";
  import Label from "$lib/UI/forms/Label.svelte";
  import NumberInput from "$lib/UI/forms/NumberInput.svelte";
  import Textarea from "$lib/UI/forms/Textarea.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import CoffeeBeansSelect from "./CoffeeBeansSelect.svelte";
  import { formatTimeForInput, parseDateFromInputString } from "./helpers";
  import TimestampPicker from "./TimestampPicker.svelte";

  // From load function:

  // const coffeeBeansName = $page.data.coffeeBeansName;

  // State UI:

  let uiCoffeeBeansValidationFailed: boolean = false;

  let onMountFinished: boolean = false;

  // State entities:

  let coffeeBeansItems: CoffeeBeans[] | undefined;

  // State form:

  let selectedCoffeeBeans: CoffeeBeans | undefined;

  let recipeTarget: string;
  let recipeResult: string;
  let recipeThoughts: string;
  let outWeight: number;
  let rating: number;

  let timestampStr: string = formatTimeForInput(new Date());

  // Reactivity:

  $: {
    if (selectedCoffeeBeans !== undefined) {
      persistFormField(FORM_NAME, COFFEEBEANS_ID, selectedCoffeeBeans.id);
    }
  }

  $: {
    if (recipeTarget !== undefined && recipeTarget !== null) {
      persistFormField(FORM_NAME, RECIPE_TARGET, recipeTarget);
    }
  }

  $: {
    if (recipeResult !== undefined && recipeResult !== null) {
      persistFormField(FORM_NAME, RECIPE_RESULT, recipeResult);
    }
  }

  $: {
    if (recipeThoughts !== undefined && recipeThoughts !== null) {
      persistFormField(FORM_NAME, RECIPE_THOUGHTS, recipeThoughts);
    }
  }

  $: {
    if (outWeight !== undefined && onMountFinished) {
      persistFormField(FORM_NAME, OUT_WEIGHT, outWeight);
    }
  }

  $: {
    if (rating !== undefined && onMountFinished) {
      persistFormField(FORM_NAME, RATING, rating);
    }
  }

  // Lifecycle hooks:

  onMount(() => {
    if (recipeTarget === "") {
      // @ts-ignore
      recipeTarget = undefined;
    }

    if (recipeResult === "") {
      // @ts-ignore
      recipeResult = undefined;
    }

    if (recipeThoughts === "") {
      // @ts-ignore
      recipeThoughts = undefined;
    }

    getAllCoffeeBeans()
      .then((items: CoffeeBeans[]) => {
        // Load the CoffeeBeans array from IndexedDB.
        coffeeBeansItems = items;
      })
      .then(() => {
        // Load the persisted SelectedCoffeeBeans from Local Storage:

        if (selectedCoffeeBeans === undefined) {
          const persistedValue = loadFormField(FORM_NAME, COFFEEBEANS_ID, "number") as number | null;

          if (persistedValue === null) {
            // If there isn't a valid persisted value, don't make any assignment, as it would trigger reactivity.
          } else {
            selectedCoffeeBeans = coffeeBeansItems?.find((item) => item.id === persistedValue);
          }
        }

        // Load the persisted RecipeTarget from Local Storage:

        if (recipeTarget === undefined || recipeTarget === "") {
          const persistedValue = loadFormField(FORM_NAME, RECIPE_TARGET, "string") as string | null;

          if (persistedValue === null) {
            // If there isn't a valid persisted value, don't make any assignment, as it would trigger reactivity.
          } else {
            recipeTarget = persistedValue;
          }
        }

        // Load the persisted RecipeResult from Local Storage:

        if (recipeResult === undefined || recipeResult === "") {
          const persistedValue = loadFormField(FORM_NAME, RECIPE_RESULT, "string") as string | null;

          if (persistedValue === null) {
            // If there isn't a valid persisted value, don't make any assignment, as it would trigger reactivity.
          } else {
            recipeResult = persistedValue;
          }
        }

        // Load the persisted RecipeThoughts from Local Storage:

        if (recipeThoughts === undefined || recipeThoughts === "") {
          const persistedValue = loadFormField(FORM_NAME, RECIPE_THOUGHTS, "string") as string | null;

          if (persistedValue === null) {
            // If there isn't a valid persisted value, don't make any assignment, as it would trigger reactivity.
          } else {
            recipeThoughts = persistedValue;
          }
        }

        // Load the persisted OutWeight from Local Storage:

        if (outWeight === undefined || outWeight === 0) {
          const persistedValue = loadFormField(FORM_NAME, OUT_WEIGHT, "number") as number | null;

          if (persistedValue === null || persistedValue === 0) {
            // If there isn't a valid persisted value, don't make any assignment, as it would trigger reactivity.
          } else {
            outWeight = persistedValue;
          }
        }

        // Load the persisted Rating from Local Storage:

        if (rating === undefined || rating === 0) {
          const persistedValue = loadFormField(FORM_NAME, RATING, "number") as number | null;

          if (persistedValue === null || persistedValue === 0) {
            // If there isn't a valid persisted value, don't make any assignment, as it would trigger reactivity.
          } else {
            rating = persistedValue;
          }
        }

        onMountFinished = true;
      });

    timestampStr = formatTimeForInput(new Date());
  });

  // Handler functions:

  async function handleSubmit() {
    // Deal with the CoffeeBeans select:
    if (selectedCoffeeBeans === undefined) {
      uiCoffeeBeansValidationFailed = true;
      return;
    }

    // Deal with the 3 textarea inputs:

    if (recipeTarget === null || recipeTarget === undefined) {
      recipeTarget = "";
    }
    recipeTarget = recipeTarget.trim();

    if (recipeResult === null || recipeResult === undefined) {
      recipeResult = "";
    }
    recipeResult = recipeResult.trim();

    if (recipeThoughts === null || recipeThoughts === undefined) {
      recipeThoughts = "";
    }
    recipeThoughts = recipeThoughts.trim();

    // Deal with the timestamp:

    const timestamp: Date = parseDateFromInputString(timestampStr);

    // Save the new recipe:

    if (selectedCoffeeBeans === undefined) {
      throw new Error("Please select the coffee beans.");
    }

    const recipeSubmit: RecipeSubmit = {
      coffeeBeansId: selectedCoffeeBeans.id,
      recipeTarget: recipeTarget,
      recipeResult: recipeResult,
      recipeThoughts: recipeThoughts,
      outWeight: outWeight,
      rating: rating,
      timestamp: timestamp
    };
    await addRecipe(recipeSubmit);

    clearFormField(FORM_NAME, COFFEEBEANS_ID);
    clearFormField(FORM_NAME, RECIPE_TARGET);
    clearFormField(FORM_NAME, RECIPE_RESULT);
    clearFormField(FORM_NAME, RECIPE_THOUGHTS);
    clearFormField(FORM_NAME, OUT_WEIGHT);
    clearFormField(FORM_NAME, RATING);

    // Refresh the page to see the updated data:

    alert("Recipe saved.");

    window.location.replace(routes.coffeeBeansItem(selectedCoffeeBeans.name));
  }
</script>

<svelte:head>
  <title>Add recipe - PourOverPotato app</title>
</svelte:head>

<PageHeadline>Add recipe</PageHeadline>

<form id="add-recipe" on:submit|preventDefault={handleSubmit}>
  <div>
    <CoffeeBeansSelect
      allCoffeeBeans={coffeeBeansItems}
      validationFailed={uiCoffeeBeansValidationFailed}
      bind:selectedCoffeeBeans
    />
  </div>

  <div>
    <Label _for={RECIPE_TARGET}>{naming.recipe.recipeTarget}:</Label>
  </div>
  <div>
    <Textarea id={RECIPE_TARGET} name={RECIPE_TARGET} placeholder={RECIPE_TARGET_PH} bind:value={recipeTarget} />
  </div>

  <div>
    <Label _for={RECIPE_RESULT}>{naming.recipe.recipeResult}:</Label>
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
    <Label _for={RECIPE_THOUGHTS}>{naming.recipe.recipeThoughts}:</Label>
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

  <button class="my-button" form="add-recipe" type="submit"> Save </button>
</form>

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
</style>
