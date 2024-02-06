<script lang="ts">
  import { onMount } from "svelte";
  import { getAllRecipes } from "$lib/database/v1/indexedDB";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { sortRecipesByTimestampDesc as byTimestampDesc } from "$lib/domain/helpers/sortRecipes";
  import { routes } from "$lib/domain/routes";
  import RecipeCard from "$lib/UI/cards/RecipeCard.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import MyFab from "$lib/UI/MyFab.svelte";

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
  <title>Pour over recipes - PourOverPotato app</title>
</svelte:head>

<PageHeadline>Recipes</PageHeadline>

{#if recipes === undefined}
  <p>loading...</p>
{:else if recipes.length === 0}
  <p>No recipes added yet.</p>
{:else}
  <h2>Sorted by latest recipe</h2>

  {#each recipes as recipe}
    <RecipeCard href={routes.recipeItem(recipe.id)} {recipe} showCoffeeBeansName />
  {/each}
{/if}

<MyFab href={routes.addRecipe()} />

<style lang="postcss">
  h2 {
    @apply text-lg font-normal tracking-tight text-gray-900 dark:text-white;

    margin-top: 1rem;
  }
</style>
