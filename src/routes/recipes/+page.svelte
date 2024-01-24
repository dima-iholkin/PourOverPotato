<script lang="ts">
  import { onMount } from "svelte";
  import { Fab } from "konsta/svelte";
  import RecipeCard from "$lib/RecipeCard.svelte";
  import PlusIcon from "$lib/PlusIcon.svelte";
  import type { Recipe } from "../../entities/Recipe";
  import { getAllRecipes } from "../../database/indexedDB";
  import { sortRecipesByTimestampDesc as byTimestampDesc } from "../../database/helpers/sortRecipes";

  let recipes: Recipe[] | undefined;

  onMount(() => {
    getAllRecipes().then((items: Recipe[]) => {
      recipes = items.sort(byTimestampDesc);
    });
  });
</script>

<svelte:head>
  <title>All recipes</title>
</svelte:head>

<h1>All recipes</h1>
<p>Sorted by timestamp</p>

{#if recipes === undefined}
  <p>loading...</p>
{:else}
  {#each recipes as recipe}
    <RecipeCard {recipe} showCoffeeBeans />
  {/each}
{/if}

<Fab class="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20" text="Add recipe" href="/recipes/add">
  <svelte:component this={PlusIcon} slot="icon" />
</Fab>
