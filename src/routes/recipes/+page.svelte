<script lang="ts">
  import { onMount } from "svelte";
  import RecipeCard from "$lib/UI/RecipeCard.svelte";
  import MyFab from "$lib/UI/MyFab.svelte";
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

<MyFab href="/recipes/add" />
