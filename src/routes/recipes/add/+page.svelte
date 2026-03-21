<script lang="ts">
  import { page } from "$app/state";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import AddRecipeForm from "$lib/UI/pageComponents/addRecipe/AddRecipeForm.svelte";

  // Load function:
  const coffeeBeansName: string | null = $derived(page.url.searchParams.get("coffeeBeansName") ?? null);
</script>

<svelte:head>
  <title>Add recipe - PourOverPotato</title>
</svelte:head>

<PageHeadline>Add recipe</PageHeadline>

<AddRecipeForm {coffeeBeansName} />
