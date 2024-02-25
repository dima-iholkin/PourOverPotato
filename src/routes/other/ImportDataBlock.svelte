<script lang="ts">
  import { importData } from "$lib/database/v1/indexedDB";

  // Handlers:

  async function handleImportButtonClick() {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = async () => {
      // you can use this method to get file and perform respective operations
      // let files = Array.from(input.files);
      console.log(input.files);

      if (input.files === null || input.files.item(0) === undefined || input.files.item(0) === null) {
        alert("Please provide a single file.");
        return;
      }

      if (input.files.length > 1) {
        alert("Please provide a single file.");
        return;
      }

      const file: File = input.files.item(0)!;
      if (file.type !== "application/json") {
        alert("Please provide a JSON file.");
        return;
      }

      await importData(file);
    };

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
