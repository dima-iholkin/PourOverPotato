<script lang="ts" context="module">
  const options: Intl.DateTimeFormatOptions = {
    timeStyle: "short",
    dateStyle: "long"
  };
</script>

<script lang="ts">
  import type { Recipe } from "../entities/Recipe";

  // Props:

  export let recipe: Recipe;
</script>

<div style="margin: 16px 0; border: solid #EEEEEE;">
  <p style="font-family: 'Courier New', Courier, monospace; margin: 8px 0;">
    {recipe.timestamp.toLocaleString(undefined, options)}
  </p>
  <p style="margin: 8px 0;">Rating: {recipe.rating}</p>
  <p style="margin: 8px 0;">Out: {recipe.outputWeight}g</p>
  <p style="margin: 8px 0;">Details: {recipe.recipeAim}</p>
</div>
