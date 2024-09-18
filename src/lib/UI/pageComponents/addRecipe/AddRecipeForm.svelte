<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getAllCoffeeBeans } from "$lib/database/manageCoffeeBeans";
  import { addRecipe } from "$lib/database/manageRecipes";
  import { naming } from "$lib/domain/constants/naming";
  import { routes } from "$lib/domain/constants/routes";
  import { placeholders } from "$lib/domain/constants/strings";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { RecipeSubmit } from "$lib/domain/entities/Recipe";
  import { formatTimeForInput, parseDateFromInputString } from "$lib/helpers/dateHelpers";
  import { clearFormField, loadFormField, persistFormField } from "$lib/localStorage/persistForms";
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
  const ROAST_DATE = "roast-date";
  const BAG_NUMBER = "bag-number";
  const RECIPE_TARGET = "recipe-target";
  const RECIPE_RESULT = "recipe-result";
  const RECIPE_THOUGHTS = "recipe-thoughts";
  const OUT_WEIGHT = "out-weight";
  const RATING = "rating";
  const FAVORITE = "favorite";
  const FORM_NAME = "addRecipe";
  const COFFEEBEANS_ID = "coffee-beans";

  // Props:
  export let coffeeBeansName: string | null;

  // Bind triggers:
  let bindSetValidationFailed: ((state: boolean) => void) | undefined;

  // Bind DOM elements:
  let bindSelectDOM: HTMLSelectElement | undefined;

  // UI state:
  let initFinished: boolean = false;

  // Entities state:
  let coffeeBeansItems: CoffeeBeans[];

  // Form state:
  let selectedCoffeeBeansId: number | undefined = undefined;
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
  $: if (roastDate.getTime() === 0) {
    daysSinceRoast = undefined;
  } else if (timestampStr !== "") {
    const roastTimestamp: number = roastDate.getTime();
    const recipeTimestamp: number = parseDateFromInputString(timestampStr.split("T")[0] + "T12:00").getTime();
    daysSinceRoast = Math.round((recipeTimestamp - roastTimestamp) / (1000 * 60 * 60 * 24));
  }

  // Reactivity, to persist the form values:

  $: if (selectedCoffeeBeansId !== undefined && initFinished) {
    persistFormField(FORM_NAME, COFFEEBEANS_ID, selectedCoffeeBeansId);
    const _coffeeBeansName: string | undefined = coffeeBeansItems.find(
      (item) => item.id === selectedCoffeeBeansId
    )?.name;
    goto(routes.addRecipe(_coffeeBeansName));
  }

  $: {
    roastDate;
    if (initFinished) {
      persistFormField(FORM_NAME, ROAST_DATE, roastDate.getTime());
    }
  }

  $: {
    bagNumber;
    if (initFinished) {
      persistFormField(FORM_NAME, BAG_NUMBER, bagNumber);
    }
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

  $: {
    favorite;
    if (initFinished) {
      persistFormField(FORM_NAME, FAVORITE, favorite ? 1 : 0);
    }
  }

  // Lifecycle:
  onMount(() => {
    getAllCoffeeBeans().then((items: CoffeeBeans[]) => {
      // Load all CoffeeBeans from IndexedDB:
      coffeeBeansItems = items;
      if (coffeeBeansName) {
        selectedCoffeeBeansId = coffeeBeansItems.find(
          (item) => item.name.toLowerCase() === coffeeBeansName.toLowerCase()
        )?.id;
      } else {
        // Load the persisted form values from LocalStorage:
        selectedCoffeeBeansId = <number | undefined>loadFormField(FORM_NAME, COFFEEBEANS_ID, "number") ?? undefined;
      }
      // Load the persisted form values from LocalStorage:
      roastDate = new Date(<number>loadFormField(FORM_NAME, ROAST_DATE, "number")) ?? new Date(0);
      bagNumber = <string>loadFormField(FORM_NAME, BAG_NUMBER, "string") ?? "";
      recipeTarget = <string>loadFormField(FORM_NAME, RECIPE_TARGET, "string") ?? "";
      recipeResult = <string>loadFormField(FORM_NAME, RECIPE_RESULT, "string") ?? "";
      recipeThoughts = <string>loadFormField(FORM_NAME, RECIPE_THOUGHTS, "string") ?? "";
      outWeight = <number>(loadFormField(FORM_NAME, OUT_WEIGHT, "number") ?? 0);
      rating = <number>(loadFormField(FORM_NAME, RATING, "number") ?? 0);
      favorite = <boolean>(loadFormField(FORM_NAME, FAVORITE, "number") === 1 ? true : false);
      // Finish init:
      initFinished = true;
    });
  });

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
    recipeTarget = recipeTarget.trim();
    recipeResult = recipeResult.trim();
    recipeThoughts = recipeThoughts.trim();
    const timestamp: Date = parseDateFromInputString(timestampStr);
    // Save the new recipe:
    const recipeSubmit: RecipeSubmit = {
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
    // Clear the persisted form values from LocalStorage:
    clearFormField(FORM_NAME, ROAST_DATE);
    clearFormField(FORM_NAME, BAG_NUMBER);
    clearFormField(FORM_NAME, COFFEEBEANS_ID);
    clearFormField(FORM_NAME, RECIPE_TARGET);
    clearFormField(FORM_NAME, RECIPE_RESULT);
    clearFormField(FORM_NAME, RECIPE_THOUGHTS);
    clearFormField(FORM_NAME, OUT_WEIGHT);
    clearFormField(FORM_NAME, RATING);
    clearFormField(FORM_NAME, FAVORITE);
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
