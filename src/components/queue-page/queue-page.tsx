import React, { useEffect, useRef, useState } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { TElement } from '../../types/data';
import { ElementStates } from '../../types/element-states';
import { Queue } from '../../utils/classes/class-queue';
import { delay } from '../../utils/functions';
import Form from '../form/form';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import queueStyles from './queue-page.module.css';

export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [state, setState] = useState<ElementStates>();

  const queue = new Queue<TElement<string>>(7);
  const queueRef = useRef(queue);

  const [array, setArray] = useState(queueRef.current.getQueue());
  const [current, setCurrent] = useState<number>();

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

  const head = queueRef.current.getHead();
  const tail = queueRef.current.getTail();
  const length = queueRef.current.getLength();
  const size = queueRef.current.getSize();



  useEffect(() => {
    if (inputValue) {
      setStateButtonAdd({...stateButtonAdd, disabled: false});
    } else {
      setStateButtonAdd({...stateButtonAdd, disabled: true});
    }
  }, [inputValue]);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (length > 6) {
      setStateButtonAdd({...stateButtonAdd, disabled: true});
    }
  };

  const onQueueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (length >= size) {
      return;
    }
    queueRef.current.enqueue({
      value: inputValue,
      state: ElementStates.Default,
    });
    setCurrent(tail + 1);
    setState(ElementStates.Changing);
    setInputValue('');
    setArray(queueRef.current.getQueue());
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
    setCurrent(head);
    setState(ElementStates.Changing);
    setStateButtonRemove({...stateButtonRemove, isLoader: true});
    setStateButtonClear({...stateButtonClear, disabled: true});
    await delay(SHORT_DELAY_IN_MS);
    queueRef.current.dequeue();
    setState(ElementStates.Default);
    setArray(queueRef.current.getQueue());
    if (length > 0) {
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

  const onClickClear = async () => {
    queueRef.current.clear();
    setArray(queueRef.current.getQueue());
    setStateButtonClear({...stateButtonClear, disabled: true});
    setStateButtonRemove({...stateButtonRemove, disabled: true});
  };


  return (
    <SolutionLayout title='Очередь'>
      <Form
        name='Queue'
        onSubmit={onQueueSubmit}
        extraClassForm={queueStyles.form}
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
          extraClass={queueStyles.button}
          isLoader={stateButtonClear.isLoader}
          disabled={stateButtonClear.disabled}
          onClick={onClickClear}
        />
      </Form>
      <ul className={queueStyles.list}>
        {array?.map((el, index) => (
          <li key = {index}>
            <Circle
              letter={el?.value ? el.value : ''}
              state={
                index === current  
                ? state 
                : el?.state
              }
              index={index}
              head={el?.value && index === head ? 'head' : null}
              tail={el?.value && index === tail ? 'tail' : null}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
