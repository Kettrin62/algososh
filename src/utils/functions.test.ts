import { waitFor } from '@testing-library/react';
import { generateBubbleSort, generateReverse, generateSelectionSort } from './functions';
import {
  arrEven,
  reverseArrEven,
  arrOdd,
  reverseArrOdd,
  arrOne,
  reverseArrOne,
  arrEmpty,
  arrSortOne,
  arrSortOneResult,
  arrSortSeveral,
  arrSortAscending,
  arrSortDescending,
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
    expect(array).toEqual([]);
  });
});

describe('Тестирование алгоритма сортировки выбором', () => {
  it('Корректно сортирует пустой массив', () => {
    let generatorAscending = generateSelectionSort(arrEmpty, 'ascending');
    let arrayAscending: Array<TElement<number>> = [];
    for(let value of generatorAscending) {
      value;
      arrayAscending = value;
    }
    expect(arrayAscending).toEqual([]);
    let generatorDescending = generateSelectionSort(arrEmpty, 'descending');
    let arrayDescending: Array<TElement<number>> = [];
    for(let value of generatorDescending) {
      value;
      arrayAscending = value;
    }
    expect(arrayDescending).toEqual([]);
  });

  it('Корректно сортирует массив из одного элемента', () => {
    let generatorAscending = generateSelectionSort(arrSortOne, 'ascending');
    let arrayAscending: Array<TElement<number>> = [];
    for(let value of generatorAscending) {
      value;
      arrayAscending = value;
    }
    expect(arrayAscending).toEqual(arrSortOneResult);
    let generatorDescending = generateSelectionSort(arrSortOne, 'descending');
    let arrayDescending: Array<TElement<number>> = [];
    for(let value of generatorDescending) {
      value;
      arrayDescending = value;
    }
    expect(arrayDescending).toEqual(arrSortOneResult);
  });

  it('Корректно сортирует массив из нескольких элементов', () => {
    let generatorAscending = generateSelectionSort(arrSortSeveral, 'ascending');
    let arrayAscending: Array<TElement<number>> = [];
    for(let value of generatorAscending) {
      value;
      arrayAscending = value;
    }
    expect(arrayAscending).toEqual(arrSortAscending);
    let generatorDescending = generateSelectionSort(arrSortSeveral, 'descending');
    let arrayDescending: Array<TElement<number>> = [];
    for(let value of generatorDescending) {
      value;
      arrayDescending = value;
    }
    expect(arrayDescending).toEqual(arrSortDescending);
  });
});

describe('Тестирование алгоритма сортировки пузырьком', () => {
  it('Корректно сортирует пустой массив', () => {
    let generatorAscending = generateBubbleSort(arrEmpty, 'ascending');
    let arrayAscending: Array<TElement<number>> = [];
    for(let value of generatorAscending) {
      value;
      arrayAscending = value;
    }
    expect(arrayAscending).toEqual([]);
    let generatorDescending = generateBubbleSort(arrEmpty, 'descending');
    let arrayDescending: Array<TElement<number>> = [];
    for(let value of generatorDescending) {
      value;
      arrayAscending = value;
    }
    expect(arrayDescending).toEqual([]);
  });

  it('Корректно сортирует массив из одного элемента', () => {
    let generatorAscending = generateBubbleSort(arrSortOne, 'ascending');
    let arrayAscending: Array<TElement<number>> = [];
    for(let value of generatorAscending) {
      value;
      arrayAscending = value;
    }
    expect(arrayAscending).toEqual(arrSortOneResult);
    let generatorDescending = generateBubbleSort(arrSortOne, 'descending');
    let arrayDescending: Array<TElement<number>> = [];
    for(let value of generatorDescending) {
      value;
      arrayDescending = value;
    }
    expect(arrayDescending).toEqual(arrSortOneResult);
  });

  it('Корректно сортирует массив из нескольких элементов', () => {
    let generatorAscending = generateBubbleSort(arrSortSeveral, 'ascending');
    let arrayAscending: Array<TElement<number>> = [];
    for(let value of generatorAscending) {
      value;
      arrayAscending = value;
    }
    expect(arrayAscending).toEqual(arrSortAscending);
    let generatorDescending = generateBubbleSort(arrSortSeveral, 'descending');
    let arrayDescending: Array<TElement<number>> = [];
    for(let value of generatorDescending) {
      value;
      arrayDescending = value;
    }
    expect(arrayDescending).toEqual(arrSortDescending);
  });
});

