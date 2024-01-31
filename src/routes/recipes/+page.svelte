<script lang="ts">
  import MyFab from "$lib/UI/MyFab.svelte";
  import RecipeCard from "$lib/UI/cards/RecipeCard.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import { sortRecipesByTimestampDesc as byTimestampDesc } from "$lib/database/helpers/sortRecipes";
  import { getAllRecipes } from "$lib/database/v1/indexedDB";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { routes } from "$lib/domain/routes";
  import { onMount } from "svelte";

  // State:

  let recipes: Recipe[] | undefined;

  // Lifecycle hooks:

  onMount(() => {
    getAllRecipes().then((items: Recipe[]) => {
      recipes = items.sort(byTimestampDesc);
    });
  });
</script>

<svelte:head>
  <title>Pour over recipes</title>
</svelte:head>

<PageHeadline>Recipes</PageHeadline>

{#if recipes === undefined}
  <p>loading...</p>
{:else if recipes.length === 0}
  <p>No recipes added yet.</p>
{:else}
  {#each recipes as recipe}
    <RecipeCard {recipe} showCoffeeBeans />
  {/each}
{/if}

<MyFab href={routes.addRecipe()} />
