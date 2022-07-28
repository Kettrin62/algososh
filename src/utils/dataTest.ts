import { ElementStates } from '../types/element-states';

export const arrEven = [
  {
    value: '1',
    state: ElementStates.Default,
  },
  {
    value: '2',
    state: ElementStates.Default,
  },
  {
    value: '3',
    state: ElementStates.Default,
  },
  {
    value: '4',
    state: ElementStates.Default,
  },
];

export const reverseArrEven = [
  {
    value: '4',
    state: ElementStates.Modified,
  },
  {
    value: '3',
    state: ElementStates.Modified,
  },
  {
    value: '2',
    state: ElementStates.Modified,
  },
  {
    value: '1',
    state: ElementStates.Modified,
  },
];

export const arrOdd = [
  {
    value: '1',
    state: ElementStates.Default,
  },
  {
    value: '2',
    state: ElementStates.Default,
  },
  {
    value: '3',
    state: ElementStates.Default,
  },
];

export const reverseArrOdd = [
  {
    value: '3',
    state: ElementStates.Modified,
  },
  {
    value: '2',
    state: ElementStates.Modified,
  },
  {
    value: '1',
    state: ElementStates.Modified,
  },
];

export const arrOne = [{
  value: '0',
  state: ElementStates.Default,
}];

export const reverseArrOne = [{
  value: '0',
  state: ElementStates.Modified,
}];

export const arrEmpty = [{
  value: '',
  state: ElementStates.Default,
}];

export const reverseArrEmpty = [{
  value: '',
  state: ElementStates.Modified,
}];