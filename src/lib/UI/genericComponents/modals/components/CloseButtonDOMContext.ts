import { createContext } from 'svelte';
import type CloseButton from './CloseButton.svelte';

export const [getModalCloseButtonDOMContext, setModalCloseButtonDOMContext] =
  createContext<ReturnType<typeof CloseButton> | undefined>();