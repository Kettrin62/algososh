import React, { useState, useEffect } from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { TElement } from '../../types/data';
import { ElementStates } from '../../types/element-states';
import { delay, reverse, stringConversion } from '../../utils/functions';
import Form from '../form/form';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import stringStyles from './string.module.css';

export const StringComponent: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [array, setArray] = useState<TElement<string>[]>();
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    if (textValue) {
      setDisabled(false);
    } else setDisabled(true);
  }, [textValue]);

  const onChangeTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const reverseString = async (str: string)  => {
    const arr = stringConversion(str);
    setArray([...arr]);
    const cycleEnd = arr.length / 2;
    // for (let i = 0; i < cycleEnd; i++) {
    //   setTimeout(() => {
    //     let start = i;
    //     let end = (str.length - 1) - start;
    //     arr[start].state = ElementStates.Changing;
    //     arr[end].state = ElementStates.Changing;
    //     setArray([...arr]);
    //     setTimeout(() => {
    //       let curr = arr[start].value;
    //       arr[start] = {
    //         value: arr[end].value,
    //         state: ElementStates.Modified,
    //       };
    //       arr[end] = {
    //         value: curr,
    //         state: ElementStates.Modified,
    //       }
    //       setArray([...arr]);
    //     }, DELAY_IN_MS);
    //   }, DELAY_IN_MS * i);
    // }
    setArray(reverse(arr, DELAY_IN_MS));
    await delay(DELAY_IN_MS * (cycleEnd + 1/2));
    setIsLoader(false);
  }

  const onStringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoader(true);
    reverseString(textValue);
  };

  return (
    <SolutionLayout title='Строка'>
      <Form 
        name='string' 
        onSubmit={onStringSubmit}
      >
        <Input
          maxLength = {11}
          isLimitText = {true}
          onChange={onChangeTextValue}
        />
        <Button
          text = 'Развернуть'
          type = 'submit'
          disabled={disabled}
          isLoader={isLoader}
          linkedList='small'
          extraClass={stringStyles.button}
        />
      </Form>
      <ul className={stringStyles.list}>
        {array?.map((el, index) => (
          <li key = {index}>
            <Circle
              letter={el.value}
              state={el.state}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
