<script lang="ts">
  import { onMount } from "svelte";
  import { error } from "@sveltejs/kit";
  import { Fab } from "konsta/svelte";
  import type { PageData } from "./$types";
  import type { CoffeeBeans } from "../../../entities/CoffeeBeans";
  import type { Recipe } from "../../../entities/Recipe";
  import PlusIcon from "$lib/PlusIcon.svelte";
  import { getAllCoffeeBeans, getCoffeeBeansByName, getRecipesByCoffeeBeansId } from "../../../database/indexedDB";

  export let data: PageData;

  let didMount: boolean = false;

  let coffeeBeans: CoffeeBeans | undefined;
  $: coffeeBeans;

  let recipes: Recipe[] | undefined;
  $: recipes;

  const options: Intl.DateTimeFormatOptions = {
    timeStyle: "short",
    dateStyle: "long"
  };

  onMount(() => {
    getCoffeeBeansByName(data.coffeeBeansName)
      .then((item: CoffeeBeans | undefined) => {
        if (item === undefined) {
          return undefined;
        }

        coffeeBeans = item;

        return getRecipesByCoffeeBeansId(coffeeBeans.id);
      })
      .then((items: Recipe[] | undefined) => {
        if (items === undefined) {
          return;
        }

        recipes = items.sort((recipeA, recipeB) => recipeB.rating - recipeA.rating);
      })
      .then(() => {
        didMount = true;
      });
  });
</script>

{#if didMount === false}
  <p>waiting...</p>
{:else if coffeeBeans === undefined}
  <h1>404</h1>
  <p>Coffee beans not found.</p>
{:else}
  <h1>{coffeeBeans.name}</h1>

  {#if recipes === undefined}
    <p>No recipes added yet.</p>
  {:else}
    {#each recipes as recipe}
      <div style="margin: 16px 0; border: solid #EEEEEE;">
        <p style="font-family: 'Courier New', Courier, monospace; margin: 8px 0;">
          {recipe.timestamp.toLocaleString(undefined, options)}
        </p>
        <p style="margin: 8px 0;">Rating: {recipe.rating}</p>
        <p style="margin: 8px 0;">Out: {recipe.outputWeight}g</p>
        <p style="margin: 8px 0;">Details: {recipe.recipeAim}</p>
      </div>
    {/each}
  {/if}

  <Fab
    class="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20"
    text="Create"
    href="/recipes/add?coffee_beans_name={coffeeBeans.name}"
  >
    <svelte:component this={PlusIcon} slot="icon" />
  </Fab>
{/if}
