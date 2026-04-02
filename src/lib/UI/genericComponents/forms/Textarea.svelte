<script lang="ts">
  /* eslint-disable prefer-const */
  import { onMount, tick } from "svelte";
  import Label from "./Label.svelte";

  interface Props {
    resizeTextarea?: () => void;
    id?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    this_?: HTMLTextAreaElement;
    initialValue?: string;
    value?: string;
    onkeydown?: (event: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement }) => void;
  }

  let {
    resizeTextarea = $bindable(() => {
      if (this_) {
        resizeOnInput(this_);
      }
    }),
    id = "",
    label = "",
    name = "",
    placeholder = "",
    value = $bindable(""),
    this_ = $bindable(undefined),
    initialValue = undefined,
    onkeydown
  }: Props = $props();

  // Reactivity:
  $effect(() => {
    if (this_) {
      const elem = this_;
      tick().then(() => {
        resizeOnInput(elem);
      });
    }
  });

  // Lifecycle:
  onMount(() => {
    if (this_) {
      const elem = this_;
      tick().then(() => resizeOnInput(elem));
    }
  });

  // Helper:
  function resizeOnInput(currentTarget: EventTarget & HTMLTextAreaElement) {
    currentTarget.style.height = "";
    currentTarget.style.height = currentTarget.scrollHeight + "px";
  }
</script>

<div>
  <Label for_={name}>{label}</Label>
  <textarea
    {id}
    {name}
    {placeholder}
    bind:this={this_}
    bind:value
    class:unsaved-changes={initialValue !== undefined && value.trim() !== initialValue}
    oninput={(event) => resizeOnInput(event.currentTarget)}
    onkeydown={(event) => onkeydown?.(event)}
  ></textarea>
</div>

<style lang="postcss">
  @reference "tailwindcss";

  textarea {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block p-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
    width: 100%;
    padding-bottom: 1rem;
    resize: none;
    overflow-y: hidden;
  }

  .unsaved-changes {
    border-color: yellowgreen;
    outline-color: yellowgreen;
  }
</style>
