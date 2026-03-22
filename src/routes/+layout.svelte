<script lang="ts">
  import MyLayout from "$lib/UI/layout/MyLayout.svelte";
  import "./app.css";

  interface Props {
    children?: import("svelte").Snippet;
  }

  const { children }: Props = $props();
</script>

<MyLayout>
  {@render children?.()}
</MyLayout>
