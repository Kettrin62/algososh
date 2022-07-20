import { ElementStates } from './element-states';

export type TElement<T> = {
  value: T;
  state: ElementStates;
}

export type TSelector = 'descending' | 'ascending';

export type TElementLinkedList<T> = TElement<T> & {
  head?: string | React.ReactElement | null;
  tail?: string | React.ReactElement | null;
}