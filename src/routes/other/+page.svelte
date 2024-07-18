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
    This is on an open-source application developed on
    <a href="https://github.com/dima-iholkin/PourOverPotato" target="_blank">GitHub</a>.
  </p>
  <p>
    You can connect with me on
    <a href="https://www.linkedin.com/in/dima-iholkin/" target="_blank">LinkedIn</a>
    or influence the project using the
    <a href="https://github.com/dima-iholkin/PourOverPotato/discussions" target="_blank">GitHub Discussions</a>
    and the
    <a href="https://github.com/dima-iholkin/PourOverPotato/issues" target="_blank">GitHub Issues</a>.
  </p>
</div>

<h5>About your data</h5>
<div class="about-section">
  <p style="padding-bottom: 1rem;">
    By design all your data is saved in your browser only and on your device only, it's not sent anywhere, there is no
    server. You can import and export your data to and from a file.
  </p>
  <p>
    Unfortunately it's likely that I won't be able to develop the app much more. However it was and is in a very good
    and usable state since the very early versions long time ago and I will continue using it.
  </p>
</div>

<h5>Manage your data</h5>
<PersistentStorageBlock />
<ExportDataBlock />
<ImportDataBlock />

<h5>Delete your data</h5>
<DeleteAllDataBlock />

<h5>Credits</h5>
<p>
  The coffee beans icon created by
  <a href="https://www.flaticon.com/free-icons/coffee-beans" title="coffee beans icons"> Freepik - Flaticon </a>
</p>

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
    @apply text-2xl font-bold tracking-tight text-gray-900;
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
