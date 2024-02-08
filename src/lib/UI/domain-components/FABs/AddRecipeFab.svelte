<script lang="ts">
  import PlusIcon from "$lib/UI/icons/PlusIcon.svelte";

  // Props:

  export let href: string | undefined;
</script>

<div class="fab-container">
  <a {href}>
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
      bottom: 16px;
    }
  }

  @media only screen and (width < 800px) {
    .my-button {
      bottom: 80px;
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
</style>
