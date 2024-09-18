<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getAllCoffeeBeans } from "$lib/database/manageCoffeeBeans";
  import { editRecipe } from "$lib/database/manageRecipes";
  import { naming } from "$lib/domain/constants/naming";
  import { routes } from "$lib/domain/constants/routes";
  import { placeholders } from "$lib/domain/constants/strings";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { Recipe } from "$lib/domain/entities/Recipe";
  import { formatTimeForInput, parseDateFromInputString } from "$lib/helpers/dateHelpers";
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

  // Entities props:
  export let recipe: Recipe;

  // Entities state:
  let allCoffeeBeans: CoffeeBeans[] | undefined = undefined;

  // Form state:
  let selectedCoffeeBeansId: number | undefined = recipe.coffeeBeansId;
  let roastDate: Date =
    recipe.roastDate instanceof Date && isFinite(recipe.roastDate.valueOf()) ? recipe.roastDate : new Date(0);
  let bagNumber: string = recipe.bagNumber ?? "";
  let recipeTarget: string = recipe.recipeTarget;
  let recipeResult: string = recipe.recipeResult;
  let recipeThoughts: string = recipe.recipeThoughts;
  let outWeight: number = recipe.outWeight;
  let rating: number = recipe.rating;
  let favorite: boolean = recipe.favorite;
  let timestampStr: string = formatTimeForInput(recipe.timestamp);

  // Calculated state, the days since roast:
  let daysSinceRoast: number | undefined;
  $: if (roastDate.getTime() === 0) {
    daysSinceRoast = undefined;
  } else if (timestampStr !== "") {
    const roastTimestamp: number = roastDate.getTime();
    const recipeTimestamp: number = parseDateFromInputString(timestampStr.split("T")[0] + "T12:00").getTime();
    daysSinceRoast = Math.round((recipeTimestamp - roastTimestamp) / (1000 * 60 * 60 * 24));
  }

  // Calculated state, unsaved changes:
  export let hasUnsavedChanges: boolean = false;
  $: if (
    recipe &&
    selectedCoffeeBeansId === recipe.coffeeBeansId &&
    roastDate.getTime() === (recipe.roastDate ? recipe.roastDate.getTime() : 0) &&
    bagNumber === (recipe.bagNumber ?? "") &&
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
  onMount(() => {
    getAllCoffeeBeans().then((items: CoffeeBeans[]) => {
      allCoffeeBeans = items;
    });
  });

  // Handlers:
  async function handleSubmit() {
    // Validate and format the form values:
    bagNumber = bagNumber.trim();
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
      roastDate: roastDate,
      bagNumber: bagNumber,
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
    const coffeeBeansItem: CoffeeBeans | undefined = allCoffeeBeans?.find((item) => item.id === selectedCoffeeBeansId);
    // Unflag the unsaved changes to goto another page:
    hasUnsavedChanges = false;
    // Redirect user to another page:
    if (coffeeBeansItem === undefined) {
      goto(routes.home);
      return;
    }
    goto(routes.coffeeBeansItem(coffeeBeansItem.name));
  }
</script>

<form id="edit-recipe" on:submit|preventDefault={handleSubmit}>
  <CoffeeBeansSelect
    {allCoffeeBeans}
    initialCoffeeBeansId={recipe.coffeeBeansId}
    showAddButton={false}
    bind:selectedCoffeeBeansId
  />
  <FormRow>
    <RoastDatePicker
      initialValue={recipe.roastDate instanceof Date && isFinite(recipe.roastDate.valueOf())
        ? recipe.roastDate
        : new Date(0)}
      bind:dateValue={roastDate}
    />
    <DaysSinceRoastP {daysSinceRoast} onClear={() => (roastDate = new Date(0))} />
    <div style="flex-grow: 1;" />
    <TextInput
      initialValue={recipe.bagNumber ?? ""}
      labelText="Bag number:"
      nameAttr={BAG_NUMBER}
      bind:value={bagNumber}
    />
  </FormRow>
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
</style>
