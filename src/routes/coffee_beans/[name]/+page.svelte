<script lang="ts">
  import { onMount } from "svelte";
  import { getCoffeeBeansByName, getRecipesByCoffeeBeansId } from "$lib/database/v1/indexedDB";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import type { Recipe } from "$lib/domain/entities/Recipe";
  import { sortRecipesByTimestampDesc as byTimestampDesc } from "$lib/domain/helpers/sortRecipes";
  import { routes } from "$lib/domain/routes";
  import RecipeCard from "$lib/UI/domain-components/cards/RecipeCard.svelte";
  import MyFab from "$lib/UI/domain-components/FABs/AddRecipeFab.svelte";
  import Loading from "$lib/UI/domain-components/lists/Loading.svelte";
  import NoItemsYetP from "$lib/UI/domain-components/lists/NoItemsYetP.svelte";
  import SortedByP from "$lib/UI/domain-components/lists/SortedByP.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import FlexRow from "$lib/UI/utility-components/FlexRow.svelte";
  import type { PageData } from "./$types";
  import DropdownMenu from "./DropdownMenu.svelte";
  import EditCoffeeBeansModal from "./EditCoffeeBeansModal.svelte";

  // Load function:

  export let data: PageData;

  // Entities state:

  let coffeeBeans: CoffeeBeans | undefined | "CoffeeBeansNotFound";
  let recipes: Recipe[] | undefined;

  // Lifecycle:

  onMount(() => {
    getCoffeeBeansByName(data.coffeeBeansName).then(async (item: CoffeeBeans | undefined) => {
      if (item === undefined) {
        coffeeBeans = "CoffeeBeansNotFound";
        return;
      }
      coffeeBeans = item;
      const _recipes: Recipe[] = await getRecipesByCoffeeBeansId(coffeeBeans.id);
      recipes = _recipes.sort(byTimestampDesc);
    });
  });
</script>

<svelte:head>
  {#if coffeeBeans === undefined}
    <title>loading... - PourOverPotato app</title>
  {:else if coffeeBeans === "CoffeeBeansNotFound"}
    <title>404 Not Found - PourOverPotato app</title>
  {:else}
    <title>{coffeeBeans.name} - PourOverPotato app</title>
  {/if}
</svelte:head>

{#if coffeeBeans === undefined}
  <div class="loading-position">
    <Loading />
  </div>
{:else if coffeeBeans === "CoffeeBeansNotFound"}
  <div class="loading-position">
    <h1>404</h1>
    <p>Coffee beans not found.</p>
  </div>
{:else}
  <FlexRow>
    <PageHeadline>{coffeeBeans.name}</PageHeadline>
    <div class="menu-container">
      <EditCoffeeBeansModal coffeeBeansItem={coffeeBeans} />
      <DropdownMenu coffeeBeansItem={coffeeBeans} />
    </div>
  </FlexRow>
  <p class="coffee-beans-description">{coffeeBeans.description}</p>

  {#if recipes === undefined}
    <Loading />
  {:else if recipes.length === 0}
    <NoItemsYetP />
  {:else}
    <SortedByP>Sorted by latest</SortedByP>
    {#each recipes as recipe (recipe.id)}
      <RecipeCard href={routes.recipeItem(recipe.id)} {recipe} />
    {/each}
  {/if}

  <MyFab href={routes.addRecipe(coffeeBeans.name)} />
{/if}

<style>
  .loading-position {
    margin-top: 1rem;
  }

  .menu-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .coffee-beans-description {
    margin-top: 0.25rem;
    margin-bottom: 1rem;
  }
</style>
