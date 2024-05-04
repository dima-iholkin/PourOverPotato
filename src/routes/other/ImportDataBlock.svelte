<script lang="ts">
  import { importData } from "$lib/database/current/indexedDB_ExportImport";
  import { isNullOrUndefined, isPresent } from "$lib/helpers/undefinedHelpers";
  import { addToast } from "$lib/UI/generic-components/toasts/toastProvider";

  // Handler:
  async function handleImportButtonClick() {
    // Create a DOM element for file import:
    const input = document.createElement("input");
    input.type = "file";
    // Register a file import handler:
    input.onchange = async () => {
      // Guard clauses:
      if (isNullOrUndefined(input.files) || isNullOrUndefined(input.files!.item(0))) {
        alert("Please provide a file.");
        return;
      }
      if (input.files!.length > 1) {
        alert("Please provide a single file.");
        return;
      }
      // Select the first file, to be safe:
      const file: File = input.files!.item(0)!;
      // Guard clause:
      if (file.type !== "application/json") {
        alert("Please provide a JSON file.");
        return;
      }
      // Import the file's data to the DB:
      const result = await importData(file);
      // Guard clause:
      if (result === "ImportFailed") {
        return;
      }
      if (isPresent(result.addedCoffeeBeansCount) && isPresent(result.addedRecipesCount)) {
        // Show a toast to the user:
        addToast(`Imported ${result.addedCoffeeBeansCount} coffee beans and ${result.addedRecipesCount} recipes.`);
      }
    };
    // Start the file import dialog:
    input.click();
  }
</script>

<div class="container">
  <p style="margin-right: 0.5rem;">Import data:</p>
  <button on:click={handleImportButtonClick}>Import from file</button>
</div>

<style lang="postcss">
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  button {
    @apply text-yellow-500 border border-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-yellow-400 focus:ring-yellow-300 focus:ring-4 focus:outline-none;

    margin-left: 1rem;
  }
</style>
