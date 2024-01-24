<script context="module" lang="ts">
  const tzOffsetMs = new Date().getTimezoneOffset() * 60000; // Timezone offset in milliseconds.
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { CoffeeBeans } from "../../../entities/CoffeeBeans";
  import { getAllCoffeeBeans } from "../../../database/indexedDB";
  import { validateAndParseCoffeeBeans } from "./helpers";

  // From load function:

  const coffeeBeansName = $page.data.coffeeBeansName;

  // State:

  let showEmptyOption = coffeeBeansName === "" || coffeeBeansName === null;

  let coffeeBeansItems: CoffeeBeans[] | undefined;

  let showNewCoffeeBeansInput = false;

  // Lifecycle hooks:

  onMount(() => {
    getAllCoffeeBeans().then((items: CoffeeBeans[]) => {
      coffeeBeansItems = items;
    });
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
    const coffeeBeansSelect: HTMLSelectElement | undefined = event.currentTarget["coffee-beans"];
    const newCoffeeBeansInput: HTMLInputElement | undefined = event.currentTarget["new-coffee-beans"];
    if (coffeeBeansSelect === undefined) {
      throw new Error("Couldn't find the select element for CoffeeBeans.");
    }
    const coffeeBeansValidationResult = await validateAndParseCoffeeBeans(
      coffeeBeansSelect.value,
      newCoffeeBeansInput?.value
    );

    // Deal with the RecipeTarget:

    // debugger;
  }
</script>

<h1>Add recipe</h1>

<form action="#" on:submit|preventDefault={handleSubmit}>
  {#if coffeeBeansItems !== undefined}
    <div>
      <label for="coffee-beans">Coffee beans:</label>
      <select name="coffee-beans" id="coffee-beans" on:change={handleSelectChange} required>
        {#if showEmptyOption}
          <option disabled selected value></option>
        {/if}

        {#each coffeeBeansItems as item}
          <option selected={coffeeBeansName === item.name} value={item.id}>{item.name}</option>
        {/each}

        <option value="create_new">create new...</option>
      </select>

      {#if showNewCoffeeBeansInput}
        <label for="new-coffee-beans">Add new coffee beans:</label>
        <input
          name="new-coffee-beans"
          id="new-coffee-beans"
          type="text"
          placeholder="Example: Brazil Mogiana"
          required
        />
      {/if}
    </div>
  {:else}
    <div>Loading coffee beans...</div>
  {/if}

  <div>
    <label for="recipe-aim">Recipe target:</label>
  </div>
  <div>
    <textarea
      name="recipe-aim"
      id="recipe-aim"
      placeholder="Example: 17 clicks, 15g + 260g. 5m boil."
      style="width: 100%;"
    ></textarea>
  </div>

  <div>
    <label for="recipe-output">Recipe output:</label>
  </div>
  <div>
    <textarea
      name="recipe-output"
      id="recipe-output"
      placeholder="Example: 2m15s + 15s drip. 250g out."
      style="width: 100%;"
    ></textarea>
  </div>

  <div>
    <label for="output-weight">Output weight:</label>
    <input name="output-weight" id="output-weight" type="number" min="0" step="1" value="200" />
    <label for="output-weight">g</label>
  </div>

  <div>
    <label for="rating">Rating:</label>
    <input name="rating" id="rating" type="number" min="0" max="5" step="0.5" value="4" />
  </div>

  <div>
    <label for="opinion">Opinion:</label>
  </div>
  <div>
    <textarea
      name="opinion"
      id="opinion"
      placeholder="Example: Perfect balance. Perfect concentration. Flowery notes."
      style="width: 100%;"
    ></textarea>
  </div>

  <div>
    <label for="timestamp">Timestamp:</label>
    <input
      name="timestamp"
      id="timestamp"
      type="datetime-local"
      value={new Date(Date.now() - tzOffsetMs).toISOString().slice(0, -8)}
    />
  </div>
  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Save </button>
</form>

<style>
  input,
  textarea {
    border: solid #eeeeee;
  }

  button {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
  }
</style>
