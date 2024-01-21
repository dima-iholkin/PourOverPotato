<script lang="ts">
  import { onMount } from "svelte";
  import { error } from "@sveltejs/kit";
  import type { PageData } from "./$types";
  import { Fab } from "konsta/svelte";
  import PlusIcon from "$lib/PlusIcon.svelte";
  import { loadCoffeeBeans } from "../../../database/localStorage";

  export let data: PageData;

  let didMount: boolean = false;

  let coffeeBeans: CoffeeBeansItem | undefined;
  $: coffeeBeans;

  const options: Intl.DateTimeFormatOptions = {
    timeStyle: "short",
    dateStyle: "long"
  };

  onMount(() => {
    let coffeeBeansItems = loadCoffeeBeans();
    coffeeBeans = coffeeBeansItems.find((item) => item.name.toLowerCase() === data.coffeeBeansName.toLowerCase());

    if (coffeeBeans !== undefined) {
      coffeeBeans.recipes = coffeeBeans.recipes.sort((recipeA, recipeB) => recipeB.rating - recipeA.rating);
    }

    didMount = true;
  });
</script>

{#if didMount === false}
  <p>waiting...</p>
{:else if coffeeBeans === undefined}
  <h1>404</h1>
  <p>Coffee beans not found.</p>
{:else}
  <h1>{coffeeBeans.name}</h1>

  {#each coffeeBeans.recipes as recipe}
    <div style="margin: 16px 0; border: solid #EEEEEE;">
      <p style="font-family: 'Courier New', Courier, monospace; margin: 8px 0;">
        {recipe.dateTime.toLocaleString(undefined, options)}
      </p>
      <p style="margin: 8px 0;">Rating: {recipe.rating}</p>
      <p style="margin: 8px 0;">Out: {recipe.outputWeight}g</p>
      <p style="margin: 8px 0;">Details: {recipe.recipeDetails}</p>
    </div>
  {/each}

  <Fab
    class="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20"
    text="Create"
    href="/recipes/add?coffee_beans_name={coffeeBeans.name}"
  >
    <svelte:component this={PlusIcon} slot="icon" />
  </Fab>
{/if}
