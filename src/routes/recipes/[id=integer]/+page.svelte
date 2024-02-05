<script lang="ts">
  import { onMount } from "svelte";
  import { getRecipeById } from "$lib/database/v1/indexedDB";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import RecipeCard from "$lib/UI/cards/RecipeCard.svelte";
  import type { PageData } from "./$types";

  // From load function:

  export let data: PageData;

  // State:

  let recipe: Recipe | undefined = undefined;

  // Lifecycle hooks:

  onMount(() => {
    getRecipeById(data.recipeId).then((item) => {
      recipe = item;
    });
  });
</script>

{#if recipe !== undefined}
  <RecipeCard href={undefined} {recipe} showCoffeeBeansName></RecipeCard>
{:else}
  <p>404 Not Found</p>
{/if}
