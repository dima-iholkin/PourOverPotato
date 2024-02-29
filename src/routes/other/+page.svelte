<script lang="ts">
  import DeleteAllDataBlock from "./DeleteAllDataBlock.svelte";
  import DevBlock from "./DevBlock.svelte";
  import ExportDataBlock from "./ExportDataBlock.svelte";
  import ImportDataBlock from "./ImportDataBlock.svelte";
  import PersistDataBlock from "./PersistDataBlock.svelte";
</script>

<svelte:head>
  <title>Other - PourOverPotato app</title>
</svelte:head>

<h5 class="page-headline">About the app</h5>
<div class="about-section">
  <p>
    It's an open-source application developed
    <a href="https://github.com/dima-iholkin/PourOverPotato">on GitHub</a>.
  </p>
  <p>
    You can view the development process on the
    <a href="https://github.com/users/dima-iholkin/projects/5/views/1">Projects page</a>.
  </p>
  <p>You can influence the work at the project's GitHub or just contact me.</p>
</div>

<h5>About your data</h5>
<div class="about-section">
  <p>
    Currently all data is saved only in the user's browser and is not sent anywhere. Later I want to add an ability to
    import and export data to a file, and sync data with Google Drive.
  </p>
  <p>
    This is not a finilized version of the application. Things may change and data integrity is not guaranteed, however
    I'll try hard to not break you data.
  </p>
</div>

<h5>Manage your data</h5>
<PersistDataBlock />
<ExportDataBlock />
<ImportDataBlock />

<h5>Delete your data</h5>
<DeleteAllDataBlock />

<h5>Credits</h5>
<p>The coffee beans icon</p>
<a href="https://www.flaticon.com/free-icons/coffee-beans" title="coffee beans icons">
  created by Freepik - Flaticon
</a>

<h5>Developer tools</h5>
<DevBlock />

<style lang="postcss">
  .page-headline {
    margin-top: 0.5rem !important;
  }

  h5 {
    @apply text-2xl font-bold tracking-tight text-gray-900 dark:text-white;

    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

  .about-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  p {
    display: inline;
  }

  a {
    color: cornflowerblue;
  }
</style>
