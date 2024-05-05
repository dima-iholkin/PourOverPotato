<script lang="ts">
  import { onMount } from "svelte";
  import { vacuumSoftDeletedEntities } from "$lib/database/current/manageData";
  import { vacuumDeprecatedLocalStorageKeys } from "$lib/localStorage/vacuum";

  // Constants:
  const VACUUM_KEY = "vacuum_last_date";

  // Lifecycle:
  onMount(() => {
    vacuum(); // Intentionally don't wait on Promise to speed up the page load.
  });

  // Helper:
  async function vacuum() {
    // Load the date logic:
    const lastVacuumDateStr: string | null = localStorage.getItem(VACUUM_KEY);
    // Guard clause:
    if (lastVacuumDateStr === null) {
      localStorage.setItem(VACUUM_KEY, new Date().toDateString());
      return;
    }
    // Calculate difference in days:
    const lastVacuumDate = new Date(lastVacuumDateStr);
    const todayDateTime = new Date();
    const differenceInMs = todayDateTime.getTime() - lastVacuumDate.getTime();
    const differenceInFullDays = Math.floor(differenceInMs / (1000 * 3600 * 24));
    // Guard clause:
    if (differenceInFullDays < 1) {
      return;
    }
    // Happy path vacuum:
    vacuumDeprecatedLocalStorageKeys();
    await vacuumSoftDeletedEntities();
    localStorage.setItem(VACUUM_KEY, new Date().toDateString());
    console.log("Vacuum finished.");
  }
</script>
