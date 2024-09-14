<script lang="ts">
  import { onMount } from "svelte";
  import { beforeNavigate } from "$app/navigation";
  import { getRecipeById } from "$lib/database/manageRecipes";
  import { Recipe } from "$lib/domain/entities/Recipe";
  import Loading from "$lib/UI/domainComponents/lists/Loading.svelte";
  import FlexRow from "$lib/UI/genericComponents/FlexRow.svelte";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import EditRecipeForm from "$lib/UI/pageComponents/recipeId/EditRecipeForm.svelte";
  import EditRecipeTopMenu from "$lib/UI/pageComponents/recipeId/EditRecipeTopMenu.svelte";
  import type { PageData } from "./$types";

  // Load function for recipeId:
  export let data: PageData;

  // Entities state:
  let recipe: Recipe | undefined | null = null;

  // Unsaved changes state:
  let bind_hasUnsavedChangesInForm: boolean;
  let bind_ignoreUnsavedChangesForTopMenu: boolean;

  // Lifecycle:
  onMount(() => {
    getRecipeById(data.recipeId).then((item: Recipe | undefined) => {
      recipe = item;
    });
  });

  // Lifecycle method for unsaved changes:
  beforeNavigate((navigation) => {
    if (
      navigation.willUnload === false &&
      bind_hasUnsavedChangesInForm &&
      bind_ignoreUnsavedChangesForTopMenu === false
    ) {
      const navigate = confirm("Do you want to navigate away and lose unsaved changes?");
      if (navigate === false) {
        navigation.cancel();
      }
    }
  });
  // Handler for unsaved changes:
  function handleBeforeUnload(event: BeforeUnloadEvent) {
    if (bind_hasUnsavedChangesInForm && bind_ignoreUnsavedChangesForTopMenu === false) {
      event.preventDefault(); // the modern way
      event.returnValue = ""; // the old browser way
      return "Are you sure you want to navigate away?"; // even more compatible way
    }
  }
</script>

<svelte:head>
  <title>Edit recipe - PourOverPotato</title>
</svelte:head>

<svelte:window on:beforeunload={handleBeforeUnload} />

<FlexRow>
  <PageHeadline>Edit recipe</PageHeadline>
  {#if recipe instanceof Recipe}
    <EditRecipeTopMenu {recipe} bind:ignoreUnsavedChanges={bind_ignoreUnsavedChangesForTopMenu} />
  {/if}
</FlexRow>

{#if recipe === null}
  <Loading />
{:else if recipe instanceof Recipe}
  <EditRecipeForm {recipe} bind:hasUnsavedChanges={bind_hasUnsavedChangesInForm} />
{:else}
  <p>404</p>
  <p>Not Found</p>
{/if}
