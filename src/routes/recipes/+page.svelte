<script lang="ts">
  import { onMount } from "svelte";
  import { getAllRecipes } from "$lib/database/v1/indexedDB";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { sortRecipesByTimestampDesc as byTimestampDesc } from "$lib/domain/helpers/sortRecipes";
  import { routes } from "$lib/domain/routes";
  import RecipeCard from "$lib/UI/domain-components/cards/RecipeCard.svelte";
  import MyFab from "$lib/UI/domain-components/FABs/AddRecipeFab.svelte";
  import Loading from "$lib/UI/domain-components/lists/Loading.svelte";
  import SortedByP from "$lib/UI/domain-components/lists/SortedByP.svelte";
  import AddDemoCoffeeBeans_PageBlock from "$lib/UI/domain-components/page-blocks/AddDemoCoffeeBeans_PageBlock.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";

  // Entities state:

  let recipes: Recipe[] | undefined;

  // Lifecycle:

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
  <Loading />
{:else if recipes.length === 0}
  <AddDemoCoffeeBeans_PageBlock />
{:else}
  <SortedByP>Sorted by latest</SortedByP>
  {#each recipes as recipe}
    <RecipeCard href={routes.recipeItem(recipe.id)} {recipe} showCoffeeBeansName />
  {/each}
{/if}

<MyFab href={routes.addRecipe()} />
