<script lang="ts">
  import MyLayout from "$lib/MyLayout.svelte";
  import MyHeader from "$lib/MyHeader.svelte";
  import MyNavbar from "$lib/MyNavbar.svelte";
</script>

<MyLayout>
  <MyHeader />

  <MyNavbar />

  <div style="padding-left: 120px;">
    <slot />
  </div>
</MyLayout>
