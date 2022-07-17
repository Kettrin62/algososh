import React, { useEffect, useRef, useState } from 'react';
import { TElement } from '../../types/data';
import { ElementStates } from '../../types/element-states';
import Form from '../form/form';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Stack } from '../../utils/classes/class-stack';
import stackStyles from './stack-page.module.css';
import { delay } from '../../utils/functions';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const StackPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [array, setArray] = useState<TElement<string>[]>();
  const [state, setState] = useState<ElementStates>();

  const stack = new Stack<TElement<string>>();
  const stackRef = useRef(stack);
  
  const [stateButtonAdd, setStateButtonAdd] = useState({
    isLoader: false,
    disabled: true,
  });
  const [stateButtonRemove, setStateButtonRemove] = useState({
    isLoader: false,
    disabled: true,
  });
  const [stateButtonClear, setStateButtonClear] = useState({
    isLoader: false,
    disabled: true,
  });

  const top = stackRef.current.getSize() - 1;

  useEffect(() => {
    if (inputValue) {
      setStateButtonAdd({...stateButtonAdd, disabled: false});
    } else {
      setStateButtonAdd({...stateButtonAdd, disabled: true});
    }
  }, [inputValue]);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const stackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    inputValue &&
    stackRef.current.push({
      value: inputValue,
      state: ElementStates.Default,
    })
    setState(ElementStates.Changing);
    setInputValue('');
    setArray(stackRef.current.getStack());
    setStateButtonAdd({...stateButtonAdd, isLoader: true});
    setStateButtonRemove({...stateButtonRemove, disabled: true});
    setStateButtonClear({...stateButtonClear, disabled: true});
    await delay(SHORT_DELAY_IN_MS);
    setState(ElementStates.Default);
    setStateButtonAdd({
      isLoader: false,
      disabled: true,
    });
    setStateButtonRemove({...stateButtonRemove, disabled: false});
    setStateButtonClear({...stateButtonClear, disabled: false});
  };

  const onClickRemove = async () => {
    setState(ElementStates.Changing);
    setStateButtonRemove({...stateButtonRemove, isLoader: true});
    setStateButtonClear({...stateButtonClear, disabled: true});
    await delay(SHORT_DELAY_IN_MS);
    stackRef.current.pop();
    setState(ElementStates.Default);
    setArray(stackRef.current.getStack());
    if (top > 0) {
      setStateButtonRemove({...stateButtonRemove, isLoader: false});
      setStateButtonClear({...stateButtonClear, disabled: false});
    } else {
      setStateButtonRemove({
        isLoader: false,
        disabled: true,
      });
      setStateButtonClear({
        isLoader: false,
        disabled: true,
      });
    }
  };

  const onClickReset = async () => {
    stackRef.current.reset();
    setArray(stackRef.current.getStack());
    setStateButtonClear({...stateButtonClear, disabled: true});
    setStateButtonRemove({...stateButtonRemove, disabled: true});
  };

  return (
    <SolutionLayout title='Стек'>
      <Form
        name='stack' 
        onSubmit={stackSubmit}
        extraClassForm={stackStyles.form}
      >
        <Input 
          maxLength={4}
          isLimitText={true}
          onChange={onChangeInputValue}
          value={inputValue}
        />
        <Button 
          text='Добавить'
          type='submit'
          isLoader={stateButtonAdd.isLoader}
          disabled={stateButtonAdd.disabled}
        />
        <Button 
          text='Удалить'
          type='button'
          isLoader={stateButtonRemove.isLoader}
          disabled={stateButtonRemove.disabled}
          onClick={onClickRemove}
        />
        <Button 
          text='Очистить'
          type='reset'
          extraClass={stackStyles.button}
          isLoader={stateButtonClear.isLoader}
          disabled={stateButtonClear.disabled}
          onClick={onClickReset}
        />
      </Form>
      {array && (
        <ul className={stackStyles.list}>
          {array.map((el, index) => (
            <li key = {index}>
              <Circle
                letter={el.value}
                state={
                  index === top  
                  ? state 
                  : el.state
                }
                index={index}
                head={index === top ? 'top' : null}
              />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
