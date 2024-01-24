<script context="module" lang="ts">
  const COFFEEBEANS_ID = "coffee-beans";
  const NEW_COFFEEBEANS_NAME = "new-coffee-beans";
  const NEW_COFFEEBEANS_PH = "Example: Brazil Mogiana";
  const RECIPE_PLAN = "recipe-plan";
  const RECIPE_PLAN_PH = "Example: 17 clicks, 15g + 260g. 5m boil.";
  const RECIPE_RESULT = "recipe-result";
  const RECIPE_RESULT_PH = "Example: 2m15s + 15s drip. 250g out.";
  const RECIPE_OPINION = "recipe-opinion";
  const RECIPE_OPINION_PH = "Example: Perfect balance. Perfect concentration. Flowery notes.";
  const OUTPUT_WEIGHT = "output-weight";
  const RATING = "rating";
  const TIMESTAMP = "timestamp";
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { CoffeeBeans, type CoffeeBeansSubmit } from "../../../entities/CoffeeBeans";
  import { addCoffeeBeans, addRecipe, getAllCoffeeBeans } from "../../../database/indexedDB";
  import { formatTimeForInput, parseDateFromInputString, validateAndParseCoffeeBeans } from "./helpers";
  import type { RecipeSubmit } from "../../../entities/Recipe";
  import { UniquenessCollisionFailure } from "../../../database/types/UniquenessCollisionFailure";

  // From load function:

  const coffeeBeansName = $page.data.coffeeBeansName;

  // State:

  let showEmptyOption = coffeeBeansName === "" || coffeeBeansName === null;

  let coffeeBeansItems: CoffeeBeans[] | undefined;

  let showNewCoffeeBeansInput = false;

  let coffeeBeansId: string | null | undefined;
  let newCoffeeBeansName: string | null | undefined;
  let recipePlan: string | null | undefined;
  let recipeResult: string | null | undefined;
  let recipeOpinion: string | null | undefined;
  let outputWeight: number | null | undefined;
  let rating: number | null | undefined;

  let timestampStr: string = formatTimeForInput(new Date());

  // Lifecycle hooks:

  onMount(() => {
    getAllCoffeeBeans().then((items: CoffeeBeans[]) => {
      coffeeBeansItems = items;
    });

    timestampStr = formatTimeForInput(new Date());
  });

  // Handler functions:

  function handleSelectChange(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
    showEmptyOption = false;

    if (event.currentTarget?.value === "create_new") {
      showNewCoffeeBeansInput = true;
    } else {
      showNewCoffeeBeansInput = false;
    }
  }

  async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
    // Deal with the CoffeeBeans select:

    const coffeeBeansValidationResult = await validateAndParseCoffeeBeans(coffeeBeansId, newCoffeeBeansName);

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

    // Deal with Rating and OutputWeight:

    if (rating === undefined || rating === null) {
      rating = 0;
    }

    if (outputWeight === undefined || outputWeight === null) {
      outputWeight = 0;
    }

    // Deal with the timestamp:

    const timestamp: Date = parseDateFromInputString(timestampStr);

    // If all validation is successful, proceed to:
    // 1. save the new coffee beans,
    // 2. save the recipe.

    if (coffeeBeansValidationResult.newBeansName !== undefined) {
      const coffeeBeansSubmit: CoffeeBeansSubmit = {
        name: newCoffeeBeansName!,
        details: ""
      };
      const coffeeBeansResult = await addCoffeeBeans(coffeeBeansSubmit);

      if (coffeeBeansResult instanceof UniquenessCollisionFailure) {
        throw new Error("A coffee beans with this name already exist. Failed to save the new coffee beans.");
      }

      const recipeSubmit: RecipeSubmit = {
        coffeeBeansId: coffeeBeansResult.id,
        recipeTarget: recipePlan,
        recipeOutput: recipeResult,
        opinion: recipeOpinion,
        outputWeight: outputWeight,
        rating: rating,
        timestamp: timestamp
      };
      await addRecipe(recipeSubmit);

      goto("/");
    }
  }
</script>

<svelte:head>
  <title>Add recipe</title>
</svelte:head>

<h1>Add recipe</h1>

<form id="add-recipe" on:submit|preventDefault={handleSubmit}>
  {#if coffeeBeansItems !== undefined}
    <div>
      <label for={COFFEEBEANS_ID}>Coffee beans:</label>
      <select
        name={COFFEEBEANS_ID}
        id={COFFEEBEANS_ID}
        on:change={handleSelectChange}
        required
        bind:value={coffeeBeansId}
      >
        {#if showEmptyOption}
          <option disabled selected value></option>
        {/if}
        {#each coffeeBeansItems as item}
          <option selected={coffeeBeansName === item.name} value={item.id}>{item.name}</option>
        {/each}
        <option value="create_new">create new...</option>
      </select>

      {#if showNewCoffeeBeansInput}
        <label for={NEW_COFFEEBEANS_NAME}>New coffee beans name:</label>
        <input
          name={NEW_COFFEEBEANS_NAME}
          id={NEW_COFFEEBEANS_NAME}
          type="text"
          placeholder={NEW_COFFEEBEANS_PH}
          required
          minlength="3"
          bind:value={newCoffeeBeansName}
        />
      {/if}
    </div>
  {:else}
    <div>Loading coffee beans...</div>
  {/if}

  <div>
    <label for={RECIPE_PLAN}>Recipe target:</label>
  </div>
  <div>
    <textarea name={RECIPE_PLAN} id={RECIPE_PLAN} placeholder={RECIPE_PLAN_PH} bind:value={recipePlan} />
  </div>

  <div>
    <label for={RECIPE_RESULT}>Recipe result:</label>
  </div>
  <div>
    <textarea name={RECIPE_RESULT} id={RECIPE_RESULT} placeholder={RECIPE_RESULT_PH} bind:value={recipeResult} />
  </div>

  <div>
    <label for={OUTPUT_WEIGHT}>Output weight:</label>
    <input name={OUTPUT_WEIGHT} id={OUTPUT_WEIGHT} type="number" min="0" step="1" bind:value={outputWeight} />
    <label for={OUTPUT_WEIGHT}>g</label>
  </div>

  <div>
    <label for={RATING}>Rating:</label>
    <input name={RATING} id={RATING} type="number" min="0" max="5" step="0.5" bind:value={rating} />
  </div>

  <div>
    <label for={RECIPE_OPINION}>Opinion:</label>
  </div>
  <div>
    <textarea name={RECIPE_OPINION} id={RECIPE_OPINION} placeholder={RECIPE_OPINION_PH} bind:value={recipeOpinion} />
  </div>

  <div>
    <label for={TIMESTAMP}>Timestamp:</label>
    <input name={TIMESTAMP} id={TIMESTAMP} type="datetime-local" bind:value={timestampStr} />
  </div>

  <button type="submit" form="add-recipe" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Save
  </button>
</form>

<style>
  input,
  textarea {
    border: solid #eeeeee;
  }

  textarea {
    width: 100%;
  }

  button {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
  }
</style>
