import { TElement, TSelector } from '../types/data';
import { ElementStates } from '../types/element-states';

export function stringConversion(str: string): TElement<string>[] {
  let arr: TElement<string>[] = [];
  for (let i = 0; i < str.length; i++) {
    arr.push({
      value: str[i],
      state: ElementStates.Default,
    });
  };
  return arr;
}

export function randomArr(
  minLen: number, 
  maxLen: number, 
  max: number
): TElement<number>[] {
  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const randomLen = random(minLen, maxLen);
  const array: TElement<number>[] = [];
  for (let i = 0; i < randomLen; i++) {
    array.push({
      value: random(0, max),
      state: ElementStates.Default,
    });
  }
  return array;
}

export const swap = (
  arr: TElement<number>[], 
  firstIndex: number, 
  secondIndex: number
): void => {
  const temp = arr[firstIndex].value;
  arr[firstIndex].value = arr[secondIndex].value;
  arr[secondIndex].value = temp;
};

export const delay = (
  t: number
) => new Promise(resolve => setTimeout(resolve, t));

export function* generateReverse(
  arr: Array<TElement<string>>
): Generator<Array<TElement<string>>> {
  const { length } = arr;
  if (length < 1) return [];
  const cycleEnd = length / 2;
  for (let i = 0; i < cycleEnd; i++) {
    let start = i;
    let end = (length - 1) - start;
    arr[start].state = ElementStates.Changing;
    arr[end].state = ElementStates.Changing;
    yield [...arr];
    let curr = arr[start].value;
    arr[start] = {
      value: arr[end].value,
      state: ElementStates.Modified,
    };
    arr[end] = {
      value: curr,
      state: ElementStates.Modified,
    }
    yield [...arr];
  }
  yield arr;
}

export function* generateSelectionSort(
  arr: TElement<number>[], 
  selector: TSelector
): Generator<TElement<number>[]> {
  const { length } = arr;
  if (length < 1) return [];
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    let minInd = i;
    for (let j = i + 1; j < length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      yield [...arr];
      if (selector === 'descending' && arr[maxInd].value < arr[j].value) {
        maxInd = j;
      }
      if (selector === 'ascending' && arr[minInd].value > arr[j].value) {
        minInd = j;
      }
      arr[j].state = ElementStates.Default;
      yield [...arr];
    }
    selector === 'descending' && swap(arr, i, maxInd);
    selector === 'ascending' && swap(arr, i, minInd);
    arr[i].state = ElementStates.Modified;
  }
  arr[length - 1].state = ElementStates.Modified;
  yield [...arr];
}

export function* generateBubbleSort(
  arr: TElement<number>[], 
  selector: TSelector
): Generator<TElement<number>[]> {
  const { length } = arr;
  if (length < 1) return [];
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      yield [...arr];
      if (
        (selector === 'descending' && arr[j].value < arr[j + 1].value) || 
        (selector === 'ascending' && arr[j].value > arr[j + 1].value)
      ) {
        swap(arr, j, j + 1);
      }
      arr[j].state = ElementStates.Default;
    }
    arr[length - i - 1].state = ElementStates.Modified;
  }
  yield [...arr];
}