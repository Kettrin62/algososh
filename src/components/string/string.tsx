import React, { useState, useEffect } from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { TElement } from '../../types/data';
import { 
  delay, 
  generateReverse, 
  stringConversion 
} from '../../utils/functions';
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
    let generator = generateReverse(arr);
    for (let i = 0; i < cycleEnd; i++) {
      setTimeout(() => {
        setArray(generator.next().value);
        setTimeout(() => {
          setArray(generator.next().value);
        }, DELAY_IN_MS);
      }, DELAY_IN_MS * i);
    }

    await delay(DELAY_IN_MS * (cycleEnd + 1/2));
    setIsLoader(false);
  };

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
