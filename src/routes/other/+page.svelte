<script lang="ts">
  import { version } from "$app/environment";
  import DeleteAllDataBlock from "$lib/UI/pageComponents/other/DeleteAllDataBlock.svelte";
  import DevBlock from "$lib/UI/pageComponents/other/DevBlock.svelte";
  import ExportDataBlock from "$lib/UI/pageComponents/other/ExportDataBlock.svelte";
  import ImportDataBlock from "$lib/UI/pageComponents/other/ImportDataBlock.svelte";
  import PersistentStorageBlock from "$lib/UI/pageComponents/other/PersistentStorageBlock.svelte";
</script>

<svelte:head>
  <title>Other - PourOverPotato app</title>
</svelte:head>

<h5 class="page-headline">About the project</h5>
<div class="about-section">
  <p>
    This is on an open-source application developed
    <a href="https://github.com/dima-iholkin/PourOverPotato" target="_blank">on GitHub</a>.
  </p>
  <p>
    You can view the development workitems
    <a href="https://github.com/users/dima-iholkin/projects/5/views/1" target="_blank">on the Projects page</a>.
  </p>
  <p>
    You can influence the project using
    <a href="https://github.com/dima-iholkin/PourOverPotato/discussions" target="_blank">the Discussions</a> and
    <a href="https://github.com/dima-iholkin/PourOverPotato/issues" target="_blank">the Issues</a>
    pages.
  </p>
</div>

<h5>About your data</h5>
<div class="about-section">
  <p>
    By design all your data is saved in your browser only and on your device only, it's not sent anywhere, there is no
    server. You can import and export your data to and from a file.
  </p>
  <p style="padding-bottom: 1rem;">Much later I would like to add an ability to sync data with Google Drive.</p>
  <p>
    The application is in active development. Things may change and data integrity is not guaranteed. However I'll try
    hard to not break your data.
  </p>
</div>

<h5>Manage your data</h5>
<PersistentStorageBlock />
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

<h5>About the app</h5>
<div class="about-section">
  <p>Version: {version}</p>
  <p>
    <a href="https://github.com/dima-iholkin/PourOverPotato/blob/main/CHANGELOG.md" target="_blank">CHANGELOG</a>
  </p>
</div>

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
    text-decoration: revert;
    color: revert;
  }
</style>
