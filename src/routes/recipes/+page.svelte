<script lang="ts">
  import { onMount } from "svelte";
  import { getAllCoffeeBeans, getAllRecipes } from "$lib/database/current/indexedDB";
  import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import {
    sortRecipesByTimestampDesc as byTimestampDesc,
    sortRecipesByTimestampDesc
  } from "$lib/domain/helpers/sortRecipes";
  import { routes } from "$lib/domain/routes";
  import RecipeCard from "$lib/UI/domain-components/cards/RecipeCard.svelte";
  import MyFab from "$lib/UI/domain-components/FABs/AddRecipeFab.svelte";
  import Loading from "$lib/UI/domain-components/lists/Loading.svelte";
  import type { RecipesSortOrderEnum } from "$lib/UI/domain-components/lists/SortRecipesSelect/RecipesSortOrderEnum";
  import SortRecipesSelect from "$lib/UI/domain-components/lists/SortRecipesSelect/SortRecipesSelect.svelte";
  import AddDemoCoffeeBeans_PageBlock from "$lib/UI/domain-components/page-blocks/AddDemoCoffeeBeans_PageBlock.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import type { EnhancedRecipe } from "./EnhancedRecipe";

  // Entities state:

  let recipes: EnhancedRecipe[] | undefined;

  // UI state:

  let sortOrderValue: {
    value: RecipesSortOrderEnum;
    sortOrderFunc: (recipeA: Recipe, recipeB: Recipe) => number;
  };

  // Lifecycle:

  onMount(() => {
    loadEntities();
  });

  // Reactivity:

  $: {
    if (recipes) {
      recipes = recipes.sort(sortOrderValue?.sortOrderFunc ?? sortRecipesByTimestampDesc);
    }
  }

  // Helpers:

  async function loadEntities() {
    const coffeeBeans: CoffeeBeans[] = await getAllCoffeeBeans();
    const map = new Map<number, string>();
    coffeeBeans.forEach((item) => map.set(item.id, item.name));
    recipes = (await getAllRecipes()).sort(byTimestampDesc).map((item) => {
      return {
        ...item,
        coffeeBeansName: map.get(item.coffeeBeansId) ?? ""
      };
    });
  }
</script>

<svelte:head>
  <title>Pour over recipes - PourOverPotato app</title>
</svelte:head>

<PageHeadline>Recipes</PageHeadline>

{#if recipes === undefined}
  <Loading />
{:else if recipes.length === 0}
  <AddDemoCoffeeBeans_PageBlock onAddDemoEntities={() => loadEntities()} />
{:else}
  <SortRecipesSelect pageName="all_recipes" bind:sortOrderValue />
  {#each recipes as recipe}
    <RecipeCard coffeeBeansName={recipe.coffeeBeansName} href={routes.recipeItem(recipe.id)} {recipe} />
  {/each}
{/if}

<MyFab href={routes.addRecipe()} />
