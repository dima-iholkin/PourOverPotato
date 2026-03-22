<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { formatTimeForInput, parseDateFromInputString } from "$lib/_helpers/dateHelpers";
  import { getAllCoffeeBeans } from "$lib/database/coffeeBeansAPI";
  import { editRecipe } from "$lib/database/recipesAPI";
  import { naming } from "$lib/domain/constants/naming";
  import { routes } from "$lib/domain/constants/routes";
  import { placeholders } from "$lib/domain/constants/strings";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { Recipe } from "$lib/domain/entities/Recipe";
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

  interface Props {
    // Entity props:
    recipe: Recipe;
    // Unsaved changes:
    hasUnsavedChanges: boolean | undefined;
  }

  // eslint-disable-next-line prefer-const
  let { recipe, hasUnsavedChanges = $bindable() }: Props = $props();

  // Entities state:
  let allCoffeeBeans: CoffeeBeans[] | undefined = $state(undefined);

  // Form state:
  let selectedCoffeeBeansId: number | undefined = $derived(recipe.coffeeBeansId);
  let roastDate: Date = $derived(
    recipe.roastDate instanceof Date && isFinite(recipe.roastDate.valueOf()) ? recipe.roastDate : new Date(0)
  );
  let bagNumber: string = $derived(recipe.bagNumber ?? "");
  let recipeTarget: string = $derived(recipe.recipeTarget);
  let recipeResult: string = $derived(recipe.recipeResult);
  let recipeThoughts: string = $derived(recipe.recipeThoughts);
  let outWeight: number = $derived(recipe.outWeight);
  let rating: number = $derived(recipe.rating);
  let favorite: boolean = $derived(recipe.favorite);
  let timestampStr: string = $derived(formatTimeForInput(recipe.timestamp));

  // Calculated state, the days since roast:
  const daysSinceRoast: number | undefined = $derived(
    Recipe.calculateDaysSinceRoast(parseDateFromInputString(timestampStr), roastDate)
  );

  // Calculated state, unsaved changes:
  // export let hasUnsavedChanges: boolean = false;
  $effect(() => {
    if (
      recipe &&
      selectedCoffeeBeansId === recipe.coffeeBeansId &&
      roastDate.getTime() === (recipe.roastDate ? recipe.roastDate.getTime() : 0) &&
      bagNumber.trim() === (recipe.bagNumber ?? "") &&
      recipeTarget.trim() === recipe.recipeTarget &&
      recipeResult.trim() === recipe.recipeResult &&
      recipeThoughts.trim() === recipe.recipeThoughts &&
      outWeight === recipe.outWeight &&
      rating === recipe.rating &&
      favorite === recipe.favorite &&
      timestampStr === formatTimeForInput(recipe.timestamp)
    ) {
      hasUnsavedChanges = false;
    } else {
      hasUnsavedChanges = true;
    }
  });

  // Lifecycle:
  onMount(() => {
    getAllCoffeeBeans().then((items: CoffeeBeans[]) => {
      allCoffeeBeans = items;
    });
  });

  // Handlers:
  async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
    event.preventDefault();
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
    // goto(resolve(`/coffee_beans/${coffeeBeansItem.name}`));
  }
</script>

<form id="edit-recipe" onsubmit={(event) => handleSubmit(event)}>
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
    <div style="flex-grow: 1;"></div>
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
  @reference "tailwindcss";

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
