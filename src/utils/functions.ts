import { TElement } from '../types/data';
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
};

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

export function* generateReverse(arr: Array<TElement<string>>): Generator<Array<TElement<string>>> {
  const cycleEnd = arr.length / 2;
  for (let i = 0; i < cycleEnd; i++) {
    let start = i;
    let end = (arr.length - 1) - start;
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
};