<script lang="ts">
  import { onMount } from "svelte";
  import { getAllCoffeeBeans } from "$lib/database/manageCoffeeBeans";
  import { getAllRecipes } from "$lib/database/manageRecipes";
  import { routes } from "$lib/domain/constants/routes";
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { Recipe } from "$lib/domain/entities/Recipe";
  import type { RecipesSortOrderEnum } from "$lib/domain/sort/RecipesSortOrderEnum";
  import {
    sortRecipesByTimestampDesc as byTimestampDesc,
    sortRecipesByTimestampDesc
  } from "$lib/domain/sort/sortRecipes";
  import { createEnhancedRecipe, type EnhancedRecipe } from "$lib/helperTypes/EnhancedRecipe";
  import RecipeCard from "$lib/UI/domainComponents/cards/RecipeCard.svelte";
  import MyFab from "$lib/UI/domainComponents/FABs/AddRecipeFab.svelte";
  import Loading from "$lib/UI/domainComponents/lists/Loading.svelte";
  import SortRecipesSelect from "$lib/UI/domainComponents/lists/SortRecipesSelect.svelte";
  import AddDemoCoffeeBeans_PageBlock from "$lib/UI/domainComponents/pageBlocks/AddDemoCoffeeBeans_PageBlock.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";

  // Entities state:
  let recipes: EnhancedRecipe[] | undefined;

  // Sorting state:
  let sortOrderValue: {
    value: RecipesSortOrderEnum;
    sortOrderFunc: (recipeA: Recipe, recipeB: Recipe) => number;
  };

  // Lifecycle:
  onMount(() => {
    loadEntities();
  });

  // Sorting reactivity:
  $: {
    if (recipes) {
      recipes = recipes.sort(sortOrderValue?.sortOrderFunc ?? sortRecipesByTimestampDesc);
    }
  }

  // Helper:
  async function loadEntities() {
    const coffeeBeans: CoffeeBeans[] = await getAllCoffeeBeans();
    const _coffeeBeans_IdToName_Map = new Map<number, string>();
    coffeeBeans.forEach((item) => _coffeeBeans_IdToName_Map.set(item.id, item.name));
    recipes = (await getAllRecipes()).sort(byTimestampDesc).map((recipe: Recipe) => {
      const coffeeBeansName: string = _coffeeBeans_IdToName_Map.get(recipe.coffeeBeansId) ?? "";
      return createEnhancedRecipe(recipe, coffeeBeansName);
    });
  }
</script>

<svelte:head>
  <title>Recipes - PourOverPotato</title>
</svelte:head>

<PageHeadline>Recipes</PageHeadline>

{#if recipes === undefined}
  <Loading />
{:else if recipes.length === 0}
  <AddDemoCoffeeBeans_PageBlock onAddDemoEntities={() => loadEntities()} />
{:else}
  <SortRecipesSelect bind:sortOrderValue />
  {#each recipes as recipe}
    <RecipeCard coffeeBeansName={recipe.coffeeBeansName} href={routes.recipeItem(recipe.id)} {recipe} />
  {/each}
{/if}

<MyFab href={routes.addRecipe()} />
