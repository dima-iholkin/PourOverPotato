<script lang="ts">
  import { exportAllData } from "$lib/database/v1/indexedDB";

  // Handlers:

  async function handleExportButtonClick() {
    const a = document.createElement("a");
    const data: Blob = await exportAllData();
    a.href = URL.createObjectURL(data);
    a.setAttribute("download", "PourOverPotato.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
</script>

<div class="container">
  <p style="margin-right: 0.5rem;">Export all data:</p>
  <button type="button" on:click={handleExportButtonClick}> Export to file </button>
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
    @apply text-purple-500 border border-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-purple-400 focus:ring-purple-300 focus:ring-4 focus:outline-none;

    margin-left: 1rem;
  }
</style>
