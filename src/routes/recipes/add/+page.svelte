<script lang="ts">
  import { page } from "$app/stores";
  import PageHeadline from "$lib/UI/layout/PageHeadline.svelte";
  import AddRecipeForm from "$lib/UI/pageComponents/addRecipe/AddRecipeForm.svelte";

  // Load function:
  const coffeeBeansName: string | null = $page.data.coffeeBeansName;
</script>

<svelte:head>
  <title>Add recipe - PourOverPotato</title>
</svelte:head>

<PageHeadline>Add recipe</PageHeadline>

<AddRecipeForm {coffeeBeansName} />
