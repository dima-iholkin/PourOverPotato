<div class="my-container">
  <slot />
</div>

<style>
  .my-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    column-gap: 1rem;
    row-gap: 1rem;
    align-items: stretch;
    flex-grow: 0;
    flex-wrap: wrap;
  }
</style>
