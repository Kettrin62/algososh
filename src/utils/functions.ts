import { TCircle } from '../types/data';
import { ElementStates } from '../types/element-states';

export function stringConversion(str: string): TCircle[] {
  let arr: TCircle[] = [];
  for (let i = 0; i < str.length; i++) {
    arr.push({
      value: str[i],
      state: ElementStates.Default,
    });
  };
  return arr;
};