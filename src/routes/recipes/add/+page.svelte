<script context="module" lang="ts">
  const RECIPE_PLAN = "recipe-plan";
  const RECIPE_PLAN_PH = "Example: 17 clicks, 15g + 260g. 5m boil.";
  const RECIPE_RESULT = "recipe-result";
  const RECIPE_RESULT_PH = "Example: 2m15s + 15s drip. 250g out.";
  const RECIPE_OPINION = "recipe-opinion";
  const RECIPE_OPINION_PH = "Example: Perfect balance. Perfect concentration. Flowery notes.";
  const TIMESTAMP = "timestamp";
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { CoffeeBeans, type CoffeeBeansSubmit } from "../../../entities/CoffeeBeans";
  import { addCoffeeBeans, addRecipe, getAllCoffeeBeans } from "../../../database/indexedDB";
  import { formatTimeForInput, parseDateFromInputString } from "./helpers";
  import type { RecipeSubmit } from "../../../entities/Recipe";
  import { UniquenessCollisionFailure } from "../../../database/types/UniquenessCollisionFailure";
  import CoffeeBeansSelect from "./CoffeeBeansSelect.svelte";
  import Label from "$lib/forms/Label.svelte";
  import Textarea from "$lib/forms/Textarea.svelte";
  import RatingInput from "./RatingInput.svelte";
  import OutWeight from "./OutWeight.svelte";
  import NumberInput from "$lib/forms/NumberInput.svelte";
  import TimestampPicker from "./TimestampPicker.svelte";

  // From load function:

  const coffeeBeansName = $page.data.coffeeBeansName;

  // State:

  let showEmptyOption = coffeeBeansName === "" || coffeeBeansName === null;

  let coffeeBeansItems: CoffeeBeans[] | undefined;

  let showNewCoffeeBeansInput = false;

  let selectedCoffeeBeans: CoffeeBeans | undefined;
  let uiCoffeeBeansValidationFailed: boolean = false;
  let newCoffeeBeansName: string | null | undefined;
  let recipePlan: string;
  let recipeResult: string;
  let recipeOpinion: string;
  let outWeight: number;
  let rating: number;

  let timestampStr: string = formatTimeForInput(new Date());

  // Lifecycle hooks:

  onMount(() => {
    getAllCoffeeBeans().then((items: CoffeeBeans[]) => {
      coffeeBeansItems = items;
    });

    timestampStr = formatTimeForInput(new Date());
  });

  // Handler functions:

  async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
    // Deal with the CoffeeBeans select:
    if (selectedCoffeeBeans === undefined) {
      uiCoffeeBeansValidationFailed = true;
      return;
    }

    // Deal with the 3 textarea inputs:

    if (recipePlan === null || recipePlan === undefined) {
      recipePlan = "";
    }
    recipePlan = recipePlan.trim();

    if (recipeResult === null || recipeResult === undefined) {
      recipeResult = "";
    }
    recipeResult = recipeResult.trim();

    if (recipeOpinion === null || recipeOpinion === undefined) {
      recipeOpinion = "";
    }
    recipeOpinion = recipeOpinion.trim();

    // Deal with the timestamp:

    const timestamp: Date = parseDateFromInputString(timestampStr);

    // Save the new recipe:

    if (selectedCoffeeBeans === undefined) {
      throw new Error("Please select the coffee beans.");
    }

    const recipeSubmit: RecipeSubmit = {
      coffeeBeansId: selectedCoffeeBeans.id,
      recipeTarget: recipePlan,
      recipeOutput: recipeResult,
      opinion: recipeOpinion,
      outputWeight: outWeight,
      rating: rating,
      timestamp: timestamp
    };
    await addRecipe(recipeSubmit);

    goto("/");
  }
</script>

<svelte:head>
  <title>Add recipe</title>
</svelte:head>

<h1>Add recipe</h1>

<form id="add-recipe" on:submit|preventDefault={handleSubmit}>
  <div>
    <CoffeeBeansSelect
      allCoffeeBeans={coffeeBeansItems}
      bind:selectedCoffeeBeans
      validationFailed={uiCoffeeBeansValidationFailed}
    />
  </div>

  <div>
    <Label _for={RECIPE_PLAN}>Recipe target:</Label>
  </div>
  <div>
    <Textarea name={RECIPE_PLAN} id={RECIPE_PLAN} placeholder={RECIPE_PLAN_PH} bind:value={recipePlan} />
  </div>

  <div>
    <Label _for={RECIPE_RESULT}>Recipe result:</Label>
  </div>
  <div>
    <Textarea name={RECIPE_RESULT} id={RECIPE_RESULT} placeholder={RECIPE_RESULT_PH} bind:value={recipeResult} />
  </div>

  <div>
    <NumberInput labelText="Out weight (g):" min={0} step={5} nameAttr={"out-weight"} bind:value={outWeight} />
  </div>

  <div>
    <NumberInput labelText="Rating:" min={0} max={5} step={0.5} nameAttr={"rating"} bind:value={rating} />
  </div>

  <div>
    <Label _for={RECIPE_OPINION}>Opinion:</Label>
  </div>
  <div>
    <Textarea name={RECIPE_OPINION} id={RECIPE_OPINION} placeholder={RECIPE_OPINION_PH} bind:value={recipeOpinion} />
  </div>

  <div>
    <TimestampPicker bind:value={timestampStr} />
  </div>

  <button type="submit" form="add-recipe" class="my-button"> Save </button>
</form>

<style lang="postcss">
  h1 {
    @apply text-xl text-center font-bold dark:text-white;

    margin-top: 8px;
    margin-bottom: 8px;
  }

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
