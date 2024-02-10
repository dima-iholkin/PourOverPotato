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
  import { formatTimeForInput, parseDateFromInputString } from "$lib/helpers/dateHelpers";
  import { clearFormField, loadFormField, persistFormField } from "$lib/persistForms/localStorage";
  import CoffeeBeansSelect from "$lib/UI/domain-components/forms/CoffeeBeansSelect.svelte";
  import TimestampPicker from "$lib/UI/domain-components/forms/TimestampPicker.svelte";
  import NumberInput from "$lib/UI/generic-components/forms/NumberInput.svelte";
  import Textarea from "$lib/UI/generic-components/forms/Textarea.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";

  // Load function:

  // const coffeeBeansName = $page.data.coffeeBeansName;

  // UI state:

  let uiCoffeeBeansValidationFailed: boolean = false;
  let initFinished: boolean = false;

  // Entities state:

  let coffeeBeansItems: CoffeeBeans[];

  // Form state:

  let selectedCoffeeBeansId: number | undefined = undefined;
  let recipeTarget: string = "";
  let recipeResult: string = "";
  let recipeThoughts: string = "";
  let outWeight: number = 0;
  let rating: number = 0;
  let timestampStr: string = formatTimeForInput(new Date());

  // Reactivity, to persist the form values:

  $: if (selectedCoffeeBeansId !== undefined && initFinished) {
    persistFormField(FORM_NAME, COFFEEBEANS_ID, selectedCoffeeBeansId);
  }

  $: {
    recipeTarget;
    if (initFinished) {
      persistFormField(FORM_NAME, RECIPE_TARGET, recipeTarget);
    }
  }

  $: {
    recipeResult;
    if (initFinished) {
      persistFormField(FORM_NAME, RECIPE_RESULT, recipeResult);
    }
  }

  $: {
    recipeThoughts;
    if (initFinished) {
      persistFormField(FORM_NAME, RECIPE_THOUGHTS, recipeThoughts);
    }
  }

  $: {
    outWeight;
    if (initFinished) {
      persistFormField(FORM_NAME, OUT_WEIGHT, outWeight);
    }
  }

  $: {
    rating;
    if (initFinished) {
      persistFormField(FORM_NAME, RATING, rating);
    }
  }

  // Lifecycle:

  onMount(() => {
    getAllCoffeeBeans().then((items: CoffeeBeans[]) => {
      // Load all CoffeeBeans from IndexedDB:
      coffeeBeansItems = items;

      // Load the persisted form values from LocalStorage:
      selectedCoffeeBeansId = <number | undefined>loadFormField(FORM_NAME, COFFEEBEANS_ID, "number") ?? undefined;
      recipeTarget = <string>loadFormField(FORM_NAME, RECIPE_TARGET, "string") ?? "";
      recipeResult = <string>loadFormField(FORM_NAME, RECIPE_RESULT, "string") ?? "";
      recipeThoughts = <string>loadFormField(FORM_NAME, RECIPE_THOUGHTS, "string") ?? "";
      outWeight = <number>(loadFormField(FORM_NAME, OUT_WEIGHT, "number") ?? 0);
      rating = <number>(loadFormField(FORM_NAME, RATING, "number") ?? 0);

      // Finish init:
      initFinished = true;
    });
  });

  // Handlers:

  async function handleFormSubmit() {
    // Validate and format the form values:

    if (selectedCoffeeBeansId === undefined) {
      uiCoffeeBeansValidationFailed = true;
      return;
    }

    recipeTarget = recipeTarget.trim();
    recipeResult = recipeResult.trim();
    recipeThoughts = recipeThoughts.trim();

    const timestamp: Date = parseDateFromInputString(timestampStr);

    // Save the new recipe:

    const recipeSubmit: RecipeSubmit = {
      coffeeBeansId: selectedCoffeeBeansId,
      recipeTarget: recipeTarget,
      recipeResult: recipeResult,
      recipeThoughts: recipeThoughts,
      outWeight: outWeight,
      rating: rating,
      timestamp: timestamp
    };
    await addRecipe(recipeSubmit);

    // Clear the persisted form values from LocalStorage:
    clearFormField(FORM_NAME, COFFEEBEANS_ID);
    clearFormField(FORM_NAME, RECIPE_TARGET);
    clearFormField(FORM_NAME, RECIPE_RESULT);
    clearFormField(FORM_NAME, RECIPE_THOUGHTS);
    clearFormField(FORM_NAME, OUT_WEIGHT);
    clearFormField(FORM_NAME, RATING);

    // Communicate with the user:
    alert("Recipe saved.");

    // Refresh the page to see the updated data:
    const item: CoffeeBeans | undefined = coffeeBeansItems.find((item) => item.id === selectedCoffeeBeansId);
    if (item === undefined) {
      window.location.replace(routes.home);
      return;
    }
    window.location.replace(routes.coffeeBeansItem(item.name));
  }

  function handleSavedCoffeeBeans(coffeeBeans: CoffeeBeans) {
    coffeeBeansItems.push(coffeeBeans);
    selectedCoffeeBeansId = coffeeBeans.id;
    uiCoffeeBeansValidationFailed = false;
  }
</script>

<svelte:head>
  <title>Add recipe - PourOverPotato app</title>
</svelte:head>

<PageHeadline>Add recipe</PageHeadline>

<form id="add-recipe" on:submit|preventDefault={handleFormSubmit}>
  <CoffeeBeansSelect
    allCoffeeBeans={coffeeBeansItems}
    onSavedCoffeeBeans={handleSavedCoffeeBeans}
    validationFailed={uiCoffeeBeansValidationFailed}
    bind:selectedCoffeeBeansId
  />

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

  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" form="add-recipe" type="submit">
    Save
  </button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  button {
    width: 100%;
    margin-bottom: 16px;
  }
</style>
