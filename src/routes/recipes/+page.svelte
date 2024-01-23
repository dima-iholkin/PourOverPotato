<script lang="ts">
  import { onMount } from "svelte";
  import type { Recipe } from "../../entities/Recipe";
  import { getAllRecipes } from "../../database/indexedDB";
  import RecipeCard from "$lib/RecipeCard.svelte";
  import { sortRecipesByTimestampDesc as byTimestampDesc } from "../../database/helpers/sortRecipes";

  let recipes: Recipe[] | undefined;

  onMount(() => {
    getAllRecipes().then((items: Recipe[]) => {
      recipes = items.sort(byTimestampDesc);
    });
  });
</script>

<h1>All recipes</h1>
<p>Sorted by timestamp</p>

{#if recipes === undefined}
  <p>loading...</p>
{:else}
  {#each recipes as recipe}
    <RecipeCard {recipe} />
  {/each}
{/if}
