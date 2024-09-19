<script lang="ts">
  import { onMount } from "svelte";
  import { vacuumSoftDeletedEntities } from "$lib/database/manageData/manageData";
  import { vacuumDeprecatedLocalStorageKeys } from "$lib/localStorage/vacuum";

  // Constants:
  const VACUUM_KEY = "vacuum_last_date";

  // Lifecycle:
  onMount(() => {
    // Intentionally don't wait on a Promise to speed up the page load:
    vacuum();
  });

  // Helper:
  async function vacuum() {
    // Load the last vacuum date:
    const lastVacuumDateStr: string | null = localStorage.getItem(VACUUM_KEY);
    // Check if the last vacuum was less than 1 day ago:
    if (lastVacuumDateStr !== null) {
      // Calculate difference in days:
      const lastVacuumDate = new Date(lastVacuumDateStr);
      const todayDateTime = new Date();
      const differenceInMs = todayDateTime.getTime() - lastVacuumDate.getTime();
      const differenceInFullDays = Math.floor(differenceInMs / (1000 * 3600 * 24));
      // Don't vacuum if less than 1 full day since the last vacuum:
      if (differenceInFullDays < 1) {
        return;
      }
    }
    // Happy path vacuum:
    console.log("Vacuum started.");
    vacuumDeprecatedLocalStorageKeys();
    await vacuumSoftDeletedEntities();
    localStorage.setItem(VACUUM_KEY, new Date().toDateString());
    console.log("Vacuum finished.");
  }
</script>
