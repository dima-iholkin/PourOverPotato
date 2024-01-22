<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { loadCoffeeBeans } from "../../../database/localStorage";

  const coffeeBeansName = $page.data.coffeeBeansName;

  let coffeeBeansItems: CoffeeBeans[] | undefined;

  let showNewCoffeeBeansInput = false;
  let showEmptyOption = coffeeBeansName === "" || coffeeBeansName === null;

  const tzOffsetMs = new Date().getTimezoneOffset() * 60000; // Timezone offset in milliseconds.

  onMount(() => {
    coffeeBeansItems = loadCoffeeBeans();
  });

  function handleSelectChange(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
    showEmptyOption = false;

    if (event.currentTarget?.value === "create_new") {
      showNewCoffeeBeansInput = true;
    } else {
      showNewCoffeeBeansInput = false;
    }
  }
</script>

<h1>Add recipe</h1>

<form action="#">
  {#if coffeeBeansItems !== undefined}
    <div>
      <label for="coffee-beans">Coffee beans:</label>
      <select name="coffee-beans" on:change={handleSelectChange}>
        {#if showEmptyOption}
          <option disabled selected value></option>
        {/if}

        {#each coffeeBeansItems as item}
          <option selected={coffeeBeansName === item.name} value={item.name}>{item.name}</option>
        {/each}

        <option value="create_new">create new...</option>
      </select>

      {#if showNewCoffeeBeansInput}
        <label for="new-coffee-beans">Add new coffee beans:</label>
        <input type="text" name="new-coffee-beans" placeholder="Example: Brazil Mogiana" />
      {/if}
    </div>
  {:else}
    <div>loading...</div>
  {/if}

  <div>
    <label for="recipe-aim">Recipe aim:</label>
  </div>
  <div>
    <textarea name="recipe-aim" placeholder="Example: 17 clicks, 15g + 260g. 5m boil." style="width: 100%;"></textarea>
  </div>

  <div>
    <label for="recipe-output">Recipe output:</label>
  </div>
  <div>
    <textarea name="recipe-output" placeholder="Example: 2m15s + 15s drip. 250g out." style="width: 100%;"></textarea>
  </div>

  <div>
    <label for="output-weight">Output weight:</label>
    <input name="output-weight" type="number" min="0" step="1" value="250" />
    <label for="output-weight">g</label>
  </div>

  <div>
    <label for="rating">Rating:</label>
    <input name="rating" type="number" min="0" max="5" step="0.5" value="4.5" />
  </div>

  <div>
    <label for="opinion">Opinion:</label>
  </div>
  <div>
    <textarea
      name="opinion"
      placeholder="Example: Perfect balance. Perfect concentration. Flowery notes."
      style="width: 100%;"
    ></textarea>
  </div>

  <div>
    <label for="timestamp">Timestamp:</label>
    <input
      name="timestamp"
      type="datetime-local"
      value={new Date(Date.now() - tzOffsetMs).toISOString().slice(0, -8)}
    />
  </div>
</form>

<style>
  input,
  textarea {
    border: solid #eeeeee;
  }
</style>
