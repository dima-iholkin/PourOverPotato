<script lang="ts">
  import { exportAllData } from "$lib/database/current/indexedDB";

  // Handlers:

  async function handleExportButtonClick() {
    const a = document.createElement("a");
    const data: Blob = await exportAllData();
    a.href = URL.createObjectURL(data);

    const date = new Date();
    const monthNumber = date.getMonth() + 1;
    const monthString = monthNumber.toString().padStart(2, "0");
    a.setAttribute("download", `PourOverPotato-${date.getFullYear()}_${monthString}_${date.getDate()}.json`);

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
    @apply text-green-500 border border-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    @apply hover:text-white hover:bg-green-400 focus:ring-green-300 focus:ring-4 focus:outline-none;

    margin-left: 1rem;
  }
</style>
