import React, { useState, useRef, useEffect } from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import Form from '../form/form';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import stringStyles from './string.module.css';

interface ICircle {
  value: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {

  const [textValue, setTextValue] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [array, setArray] = useState<ICircle[]>();

  useEffect(() => {
    if (textValue) {
      setDisabled(false)
    } else setDisabled(true)
  }, [textValue]);

  const onChangeTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value)
  };



  const stringConversion = (str: string): ICircle[] => {
    let arr: ICircle[] = [];
    for (let i = 0; i < str.length; i++) {
      arr.push({
        value: str[i],
        state: ElementStates.Default,
      });
    };
    return arr;
  };
  
  // console.log(stringConversion(textValue));

  const reverseString = (str: string): void  => {
    let obj = stringConversion(textValue);
    setArray(obj);
    for (let i = 0; i < obj.length / 2; i++) {
      setTimeout(() => {
        let start = i;
        let end = str.length - 1 - start;
        obj[start].state = ElementStates.Changing;
        obj[end].state = ElementStates.Changing;
        setArray([...obj]);
        setTimeout(() => {
          let curr = obj[start].value;
          obj[start] = {
            value: obj[end].value,
            state: ElementStates.Modified,
          };
          obj[end] = {
            value: curr,
            state: ElementStates.Modified,
          }

          setArray([...obj]);


        }, DELAY_IN_MS);

      }, DELAY_IN_MS * i);


    }
  }

  const stringSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    reverseString(textValue);
    // console.log(array);
    

  };

  return (
    <SolutionLayout title='Строка'>
      <Form name='string' onSubmit={stringSubmit}>
        <Input
        maxLength = {11}
        isLimitText = {true}
        onChange={onChangeTextValue}
        />
        <Button
        text = 'Развернуть'
        type = 'submit'
        disabled={disabled}
        />
      </Form>
      {array && (
        <ul className={stringStyles.list}>
        {array.map((el, index) => (
          <li key = {index}>
            <Circle
              letter={el.value}
              state={el.state}
            />
          </li>
        ))}
      </ul>
      )}
      {/* <Circle letter='ljh' /> */}
    </SolutionLayout>
  );
};
