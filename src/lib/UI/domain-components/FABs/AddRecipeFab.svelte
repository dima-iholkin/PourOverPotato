<script lang="ts">
  import PlusIcon from "$lib/UI/icons/PlusIcon.svelte";

  // Props:
  export let href: string | undefined;
</script>

<!--
@component
Put this component as the last page-block on your page. This way it will create a nice gap at bottom of the page and
the FAB will not obscure the page content.
-->
<div class="page-bottom-gap" />
<div class="fab-container">
  <a {href} tabindex="-1">
    <button class="my-button">
      <div>
        <PlusIcon />
        <p>Add recipe</p>
      </div>
    </button>
  </a>
</div>

<style lang="postcss">
  button {
    @apply fixed bg-blue-600 rounded-full drop-shadow-lg flex justify-center items-center text-white;
    @apply hover:bg-blue-700 hover:drop-shadow-2xl;

    transform: translateX(-50%);
  }

  @media only screen and (min-width: 800px) {
    .my-button {
      bottom: 1rem;
    }
  }

  @media only screen and (width < 800px) {
    .my-button {
      bottom: 5rem;
    }
  }

  div {
    display: flex;
    flex-direction: row;
    margin: 16px;
  }

  p {
    margin-right: 8px;
  }

  .fab-container {
    position: static;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  .page-bottom-gap {
    height: 3rem;
  }
</style>
