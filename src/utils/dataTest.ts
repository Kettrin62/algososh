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

export const arrEmpty = [];

export const arrSortOne = [{
  value: 1,
  state: ElementStates.Default,
}];

export const arrSortOneResult = [{
  value: 1,
  state: ElementStates.Modified,
}];

export const arrSortSeveral = [
  {
    value: 10,
    state: ElementStates.Default,
  },
  {
    value: 91,
    state: ElementStates.Default,
  },
  {
    value: 58,
    state: ElementStates.Default,
  },
  {
    value: 16,
    state: ElementStates.Default,
  },
  {
    value: 100,
    state: ElementStates.Default,
  },
];

export const arrSortAscending = [
  {
    value: 10,
    state: ElementStates.Modified,
  },
  {
    value: 16,
    state: ElementStates.Modified,
  },
  {
    value: 58,
    state: ElementStates.Modified,
  },
  {
    value: 91,
    state: ElementStates.Modified,
  },
  {
    value: 100,
    state: ElementStates.Modified,
  },
];

export const arrSortDescending = [
  {
    value: 100,
    state: ElementStates.Modified,
  },
  {
    value: 91,
    state: ElementStates.Modified,
  },
  {
    value: 58,
    state: ElementStates.Modified,
  },
  {
    value: 16,
    state: ElementStates.Modified,
  },
  {
    value: 10,
    state: ElementStates.Modified,
  },
]
