import { waitFor } from '@testing-library/react';
import { generateReverse } from './functions';
import {
  arrEven,
  reverseArrEven,
  arrOdd,
  reverseArrOdd,
  arrOne,
  reverseArrOne,
  arrEmpty,
  reverseArrEmpty
} from './dataTest';
import { TElement } from '../types/data';

describe('Тестирование алгоритма разворота строки', () => {
  it('Корректно разворачивает строку с четным количеством символов', () => {
    let generator = generateReverse(arrEven);
    let array: Array<TElement<string>> = [];
    for(let value of generator) {
      value;
      array = value;
    }
    expect(array).toEqual(reverseArrEven);
  });

  it('Корректно разворачивает строку с нечетным количеством символов', async () => {
    let generator = generateReverse(arrOdd);
    let array: Array<TElement<string>> = [];
    for(let value of generator) {
      value;
      array = value;
    }
    expect(array).toEqual(reverseArrOdd);
  });

  it('Корректно разворачивает строку с одним символом', async () => {
    let generator = generateReverse(arrOne);
    let array: Array<TElement<string>> = [];
    for(let value of generator) {
      value;
      array = value;
    }
    expect(array).toEqual(reverseArrOne);
  });

  it('Корректно разворачивает пустую строку', async () => {
    let generator = generateReverse(arrEmpty);
    let array: Array<TElement<string>> = [];
    for(let value of generator) {
      value;
      array = value;
    }
    expect(array).toEqual(reverseArrEmpty);
  });
});
