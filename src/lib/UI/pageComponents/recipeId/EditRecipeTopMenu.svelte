<script lang="ts">
  import { goto } from "$app/navigation";
  import { getCoffeeBeansById } from "$lib/database/manageCoffeeBeans";
  import { hardDeleteRecipeById, softDeleteRecipeById, undoSoftDeleteRecipeById } from "$lib/database/manageRecipes";
  import { routes } from "$lib/domain/constants/routes";
  import { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";
  import { Recipe } from "$lib/domain/entities/Recipe";
  import DropdownMenu from "$lib/UI/genericComponents/dropdownMenu/DropdownMenu.svelte";
  import DropdownMenuItem from "$lib/UI/genericComponents/dropdownMenu/DropdownMenuItem.svelte";
  import DeleteConfirmationModal from "$lib/UI/genericComponents/modals/DeleteConfirmationModal.svelte";
  import { addToastWithUndo } from "$lib/UI/genericComponents/toasts/toastProvider";

  // Entities props:
  export let recipe: Recipe;
  export let ignoreUnsavedChanges: boolean = false;

  // Bind functions:
  let bind_setDeleteModalState: (state: "open" | "closed") => void;
  let bind_setDropdownState: (state: "open" | "closed") => void;

  // Handlers:
  async function handleDeleteClick() {
    // Database logic:
    await softDeleteRecipeById(recipe.id);
    const coffeeBeansItem: CoffeeBeans | undefined = await getCoffeeBeansById(recipe.coffeeBeansId);
    // Show a toast:
    addToastWithUndo(
      "Recipe deleted.",
      async () => {
        await undoSoftDeleteRecipeById(recipe.id);
        goto(routes.home).then(() =>
          coffeeBeansItem ? goto(routes.coffeeBeansItem(coffeeBeansItem.name)) : goto(routes.home)
        );
      },
      async () => {
        await hardDeleteRecipeById(recipe.id);
      }
    );
    // Disable unsaved changes alert for TopBar goto action:
    ignoreUnsavedChanges = true;
    // Navigation logic:
    coffeeBeansItem ? goto(routes.coffeeBeansItem(coffeeBeansItem.name)) : goto(routes.home);
  }
</script>

<div class="menu-container">
  <DropdownMenu bind:setDropdownState={bind_setDropdownState}>
    <DropdownMenuItem
      slot="button"
      buttonText="Delete"
      on:click={() => {
        bind_setDropdownState("closed");
        bind_setDeleteModalState("open");
      }}
    />
    <DeleteConfirmationModal
      slot="modal"
      onDeleteClick={handleDeleteClick}
      bind:setModalState={bind_setDeleteModalState}
    >
      Please confirm you want to delete this recipe
    </DeleteConfirmationModal>
  </DropdownMenu>
</div>

<style lang="postcss">
  .menu-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
