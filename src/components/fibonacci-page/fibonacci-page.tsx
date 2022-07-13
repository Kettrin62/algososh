import React, { useState, useEffect } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import Form from '../form/form';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import fibonacciStyles from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>();
  const [disabled, setDisabled] = useState(true);
  const [array, setArray] = useState<number[]>();
  const [isLoader, setIsLoader] = useState(false);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: number = + e.target.value;
    setInputValue(target);
  }

  useEffect(() => {
    if (inputValue && inputValue > 0 && inputValue < 20) {
      setDisabled(false);
    } else setDisabled(true);
  }, [inputValue]);

  const getFibonacciNumbers = (n: number): number[] => {
    let arr: number[] = [0];
    setArray(arr);
    setTimeout(() => {
      arr.push(1);
      setArray([...arr]);
    }, SHORT_DELAY_IN_MS);
    for (let i = 2; i < n + 1; i++){
      setTimeout(() => {
        arr.push(arr[i - 2] + arr[i -1]);
        setArray([...arr]);
      }, SHORT_DELAY_IN_MS * i )
    }
    setTimeout(() => {
      setIsLoader(false);
    }, SHORT_DELAY_IN_MS * n);
    return arr;
  } 

  const fibonacciSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    setIsLoader(true);
    inputValue && getFibonacciNumbers(inputValue);
  };

  const className =
    array && array.length > 9
    ? ` ${fibonacciStyles.flex}`
    : '';

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <Form name='fibonacci' onSubmit={fibonacciSubmit}>
        <Input
          max={19}
          isLimitText = {true}
          type='number'
          onChange={onChangeInputValue}
        />
        <Button
          text='Рассчитать'
          type='submit'
          disabled={disabled}
          isLoader={isLoader}
        />
      </Form>
      {array && (
        <ul className={fibonacciStyles.list + className}>
          {array.map((el, index) => (
            <li key={index}>
              <Circle
                letter={`${el}`}
                index={index}
              />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
