<script lang="ts">
  import { onMount } from "svelte";
  import { beforeNavigate, goto } from "$app/navigation";
  import { formatTimeForInput, parseDateFromInputString } from "$lib/_helpers/dateHelpers";
  import { getAllCoffeeBeans } from "$lib/database/coffeeBeansAPI";
  import { addRecipe } from "$lib/database/recipesAPI";
  import { naming } from "$lib/domain/constants/naming";
  import { routes } from "$lib/domain/constants/routes";
  import { placeholders } from "$lib/domain/constants/strings";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { Recipe, type RecipeSubmit } from "$lib/domain/entities/Recipe";
  import {
    clearNewRecipeFormState,
    loadNewRecipeFormState,
    saveNewRecipeFormState
  } from "$lib/localStorage/persistNewRecipeForm";
  import CoffeeBeansSelect from "$lib/UI/domainComponents/forms/CoffeeBeansSelect.svelte";
  import DaysSinceRoastP from "$lib/UI/domainComponents/forms/DaysSinceRoastP.svelte";
  import FavoriteCheckbox from "$lib/UI/domainComponents/forms/FavoriteCheckbox.svelte";
  import RoastDatePicker from "$lib/UI/domainComponents/forms/RoastDatePicker.svelte";
  import TimestampPicker from "$lib/UI/domainComponents/forms/TimestampPicker.svelte";
  import FormRow from "$lib/UI/genericComponents/forms/FormRow.svelte";
  import NumberInput from "$lib/UI/genericComponents/forms/NumberInput.svelte";
  import Textarea from "$lib/UI/genericComponents/forms/Textarea.svelte";
  import TextInput from "$lib/UI/genericComponents/forms/TextInput.svelte";
  import { addToast } from "$lib/UI/genericComponents/toasts/toastProvider";

  // Constants:
  const BAG_NUMBER = "bag-number";
  const RECIPE_TARGET = "recipe-target";
  const RECIPE_RESULT = "recipe-result";
  const RECIPE_THOUGHTS = "recipe-thoughts";
  const OUT_WEIGHT = "out-weight";
  const RATING = "rating";

  // Props:
  export let coffeeBeansName: string | null;

  // Bind triggers:
  let bindSetValidationFailed: ((state: boolean) => void) | undefined;

  // Bind DOM elements:
  let bindSelectDOM: HTMLSelectElement | undefined;

  // UI state:
  let initFinished: boolean = false;
  let afterSave: boolean = false;

  // Entities state:
  let coffeeBeansItems: CoffeeBeans[];

  // Form state:
  let selectedCoffeeBeansId: number | "" | undefined = undefined;
  let roastDate: Date = new Date(0);
  let bagNumber: string = "";
  let recipeTarget: string = "";
  let recipeResult: string = "";
  let recipeThoughts: string = "";
  let outWeight: number = 0;
  let rating: number = 0;
  let favorite: boolean = false;
  let timestampStr: string = formatTimeForInput(new Date());

  // Calculated state, the days since roast:
  let daysSinceRoast: number | undefined;
  $: daysSinceRoast = Recipe.calculateDaysSinceRoast(parseDateFromInputString(timestampStr), roastDate);

  // Change the URL query string reactivity:
  $: if (selectedCoffeeBeansId && initFinished) {
    const _coffeeBeansName: string | undefined = coffeeBeansItems.find(
      (item) => item.id === selectedCoffeeBeansId
    )?.name;
    goto(routes.addRecipe(_coffeeBeansName));
  }

  // Lifecycle:
  onMount(() => {
    // Load all CoffeeBeans from IndexedDB:
    getAllCoffeeBeans().then((items: CoffeeBeans[]) => {
      coffeeBeansItems = items;
      // If the coffee beans name provided in URL, use it for "selectedCoffeeBeansId":
      if (coffeeBeansName) {
        selectedCoffeeBeansId = coffeeBeansItems.find(
          (item) => item.name.toLowerCase() === coffeeBeansName.toLowerCase()
        )?.id;
      }
      // Load the persisted form state from Local Storage:
      const obj: Partial<Omit<Recipe, "id" | "timestamp">> | undefined = loadNewRecipeFormState();
      // Guard clause:
      if (obj === undefined) {
        return;
      }
      // Set the form field values from Local Storage:
      if (selectedCoffeeBeansId === "" || selectedCoffeeBeansId === undefined) {
        selectedCoffeeBeansId = obj.coffeeBeansId;
      }
      roastDate = obj.roastDate ?? new Date(0);
      bagNumber = obj.bagNumber ?? "";
      recipeTarget = obj.recipeTarget ?? "";
      recipeResult = obj.recipeResult ?? "";
      recipeThoughts = obj.recipeThoughts ?? "";
      outWeight = obj.outWeight ?? 0;
      rating = obj.rating ?? 0;
      favorite = obj.favorite ?? false;
      // Finish init:
      initFinished = true;
    });
  });

  // Persist unsaved changes:
  // Lifecycle method:
  beforeNavigate((navigation) => {
    if (navigation.willUnload === false && navigation.to?.route.id !== "/recipes/add") {
      handleBeforeUnload();
    }
  });
  // Handler:
  function handleBeforeUnload() {
    // Guard clause, don't persist the form after save:
    if (afterSave) {
      return;
    }
    // Create a Recipe object and persist it:
    const recipeObj: Partial<Omit<Recipe, "id" | "timestamp">> = {
      coffeeBeansId: selectedCoffeeBeansId === "" ? undefined : selectedCoffeeBeansId,
      roastDate: roastDate,
      bagNumber: bagNumber,
      recipeTarget: recipeTarget,
      recipeResult: recipeResult,
      recipeThoughts: recipeThoughts,
      outWeight: outWeight,
      rating: rating,
      favorite: favorite
    };
    saveNewRecipeFormState(recipeObj);
  }
  function handleVisibilityChange() {
    // Guard clause, persist the form values only if visibilityState === "hidden":
    if (document.visibilityState === "visible") {
      return;
    }
    handleBeforeUnload();
  }

  // Handlers:

  async function handleFormSubmit() {
    // Validate and format the form values:
    if (selectedCoffeeBeansId === undefined) {
      if (bindSetValidationFailed) {
        bindSetValidationFailed(true);
      }
      if (bindSelectDOM) {
        bindSelectDOM.focus();
      }
      return;
    }
    bagNumber = bagNumber.trim();
    recipeTarget = recipeTarget.trim();
    recipeResult = recipeResult.trim();
    recipeThoughts = recipeThoughts.trim();
    const timestamp: Date = parseDateFromInputString(timestampStr);
    // Save the new recipe:
    const recipeSubmit: RecipeSubmit = {
      // @ts-ignore
      coffeeBeansId: selectedCoffeeBeansId,
      roastDate: roastDate,
      bagNumber: bagNumber,
      recipeTarget: recipeTarget,
      recipeResult: recipeResult,
      recipeThoughts: recipeThoughts,
      outWeight: outWeight,
      rating: rating,
      favorite: favorite,
      timestamp: timestamp
    };
    // Save the new Recipe:
    await addRecipe(recipeSubmit);
    // Clear the persisted form state from LocalStorage:
    clearNewRecipeFormState();
    // Disable form persistance to Local Storage:
    afterSave = true;
    // Show a toast:
    addToast("Recipe created.");
    // Redirect to another page:
    const item: CoffeeBeans | undefined = coffeeBeansItems.find((item) => item.id === selectedCoffeeBeansId);
    if (item === undefined) {
      goto(routes.home);
      return;
    }
    goto(routes.coffeeBeansItem(item.name));
  }

  function handleSavedCoffeeBeans(coffeeBeans: CoffeeBeans) {
    coffeeBeansItems.push(coffeeBeans);
    selectedCoffeeBeansId = coffeeBeans.id;
    bindSetValidationFailed ? bindSetValidationFailed(false) : undefined;
  }
</script>

<svelte:window on:beforeunload={handleBeforeUnload} on:visibilitychange={handleVisibilityChange} />

<form id="add-recipe" on:submit|preventDefault={handleFormSubmit}>
  <CoffeeBeansSelect
    allCoffeeBeans={coffeeBeansItems}
    onSavedCoffeeBeans={handleSavedCoffeeBeans}
    bind:selectDOM={bindSelectDOM}
    bind:selectedCoffeeBeansId
    bind:setValidationFailed={bindSetValidationFailed}
  />
  <FormRow>
    <RoastDatePicker bind:dateValue={roastDate} />
    <DaysSinceRoastP {daysSinceRoast} onClear={() => (roastDate = new Date(0))} />
    <div style="flex-grow: 1;" />
    <TextInput labelText="Bag number:" nameAttr={BAG_NUMBER} bind:value={bagNumber} />
  </FormRow>
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
  <FavoriteCheckbox bind:value={favorite} />
  <Textarea
    id={RECIPE_THOUGHTS}
    label={naming.recipe.recipeThoughts + ":"}
    name={RECIPE_THOUGHTS}
    placeholder={placeholders.recipeThoughts}
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
