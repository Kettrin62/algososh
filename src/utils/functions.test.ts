import { waitFor } from '@testing-library/react';
import { reverse } from './functions';
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

describe('Тестирование алгоритма разворота строки', () => {
  it('Корректно разворачивает строку с четным количеством символов', async () => {
    jest.useFakeTimers();
    expect(reverse(arrEven, 0)).toHaveLength(4);
    await waitFor(() => {
      expect(reverse(arrEven, 0)).toEqual(reverseArrEven);
    });
  });

  it('Корректно разворачивает строку с нечетным количеством символов', async () => {
    jest.useFakeTimers();
    expect(reverse(arrOdd, 0)).toHaveLength(3);
    await waitFor(() => {
      expect(reverse(arrOdd, 0)).toEqual(reverseArrOdd);
    });
  });

  it('Корректно разворачивает строку с одним символом', async () => {
    jest.useFakeTimers();
    expect(reverse(arrOne, 0)).toHaveLength(1);
    await waitFor(() => {
      expect(reverse(arrOne, 0)).toEqual(reverseArrOne);
    });
  });

  it('Корректно разворачивает пустую строку', async () => {
    jest.useFakeTimers();
    expect(reverse(arrEmpty, 0)).toHaveLength(1);
    await waitFor(() => {
      expect(reverse(arrEmpty, 0)).toEqual(reverseArrEmpty);
    });
  });
});
