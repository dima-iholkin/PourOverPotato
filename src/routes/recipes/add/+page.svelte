<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { loadCoffeeBeans } from "../../../database/localStorage";

  const coffeeBeansName = $page.data.coffeeBeansName;

  let coffeeBeansItems: CoffeeBeansItem[] = [];

  let createNewCoffeeBeansInputEnabled = false;
  let emptyCoffeeBeansOptionShown = coffeeBeansName === "" || coffeeBeansName === null;

  onMount(() => {
    coffeeBeansItems = loadCoffeeBeans();
  });

  function handleSelectChange(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
    emptyCoffeeBeansOptionShown = false;

    if (event.target?.value === "create_new") {
      createNewCoffeeBeansInputEnabled = true;
    } else {
      createNewCoffeeBeansInputEnabled = false;
    }
  }
</script>

<h1>Add recipe</h1>

<form action="#">
  <div>
    <label for="coffee-beans">Coffee beans:</label>
    <select name="coffee-beans" on:change={handleSelectChange}>
      {#if emptyCoffeeBeansOptionShown}
        <option disabled selected value></option>
      {/if}
      {#each coffeeBeansItems as item}
        <option selected={coffeeBeansName === item.name} value={item.name}>{item.name}</option>
      {/each}
      <option value="create_new">create new...</option>
    </select>
    {#if createNewCoffeeBeansInputEnabled}
      <label for="new-coffee-beans">Add new coffee beans:</label>
      <input type="text" name="new-coffee-beans" placeholder="Example: Brazil Mogiana" />
    {/if}
  </div>

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
    <label for="rating">Rating:</label>
    <input type="number" name="number" min="0" max="5" step="0.5" />
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
    <input type="datetime-local" name="timestamp" value={new Date().toISOString().slice(0, -8)} />
  </div>
</form>

<style>
  input,
  textarea {
    border: solid #eeeeee;
  }
</style>
