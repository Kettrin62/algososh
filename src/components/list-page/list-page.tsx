import React, { useEffect, useRef, useState } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { delay, randomArr } from '../../utils/functions';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { LinkedList } from './class-linked-list';
import listStyles from './list-page.module.css';

interface Current {
  index: number | null,
  head: React.ReactElement | null,
  tail: React.ReactElement | null,
};

export const ListPage: React.FC = () => {

  const [inputTextValue, setInputTextValue] = useState<string>('');
  const [inputIndexValue, setInputIndexValue] = useState<number | string>();

  const [minLen, maxLen, max] = [3, 6, 100]

  const linkedList = new LinkedList<number | string>(randomArr(minLen, maxLen, max));
  const linkedListkRef = useRef(linkedList);
  
  const [array, setArray] = useState<Array<string | number>>();
  const [head, setHead] = useState<number>();

  const [currentHead, setCurrentHead] = useState<string | React.ReactElement>('head');
  const [currentTail, setCurrentTail] = useState<string | React.ReactElement>('tail');

  const [stateHead, setStateHead] = useState<ElementStates>();
  const [state, setState] = useState<ElementStates[]>(Array(linkedListkRef.current.getSize()).fill(ElementStates.Default));

  const [currentAdd, setCurrentAdd] = useState<Current>({
    index: null,
    head: null,
    tail: null,
  });

  const [currentDelete, setCurrentDelete] = useState<Current>({
    index: null,
    head: null,
    tail: null,
  });

  const [stateButtonAddHead, setStateButtonAddHead] = useState({
    isLoader: false,
    disabled: true,
  });
  const [stateButtonAddTail, setStateButtonAddTail] = useState({
    isLoader: false,
    disabled: true,
  });
  const [stateButtonDeleteHead, setStateButtonDeleteHead] = useState({
    isLoader: false,
    disabled: false,
  });
  const [stateButtonDeleteTail, setStateButtonDeleteTail] = useState({
    isLoader: false,
    disabled: false,
  });
  const [stateButtonAddByIndex, setStateButtonAddByIndex] = useState({
    isLoader: false,
    disabled: true,
  });
  const [stateButtonDeleteByIndex, setStateButtonDeleteByIndex] = useState({
    isLoader: false,
    disabled: true,
  });

  useEffect(() => {
    setArray(linkedListkRef.current.toInitArray());
    setHead(0);
  }, [])

  useEffect(() => {
    if (inputTextValue) {
      setStateButtonAddHead({isLoader: false, disabled: false});
      setStateButtonAddTail({isLoader: false, disabled: false});
    } else {
      setStateButtonAddHead({isLoader: false, disabled: true});
      setStateButtonAddTail({isLoader: false, disabled: true});
    }
  }, [inputTextValue]);

  useEffect(() => {
    if (inputIndexValue || (inputIndexValue === 0)) {
      setStateButtonDeleteByIndex({isLoader: false, disabled: false});
    } else {
      setStateButtonDeleteByIndex({isLoader: false, disabled: true});
      setStateButtonAddByIndex({isLoader: false, disabled: true});

    }
    if ((inputIndexValue && inputTextValue) || (inputIndexValue === 0 && inputTextValue)) {
      setStateButtonAddByIndex({isLoader: false, disabled: false});
    }
  }, [inputIndexValue, inputTextValue]);

  const onChangeInputTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(e.target.value);
  };

  const onChangeInputIndexValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: number = + e.target.value;
    setInputIndexValue(target);
  };

  const circle = (value: string): React.ReactElement => (
    <Circle
      letter={value}
      state={ElementStates.Changing}
      isSmall={true}
    />
  );

  const onClickAddHead = async () => {
    setStateButtonAddHead({isLoader: true, disabled: false});
    setStateButtonAddTail({isLoader: false, disabled: true});
    setStateButtonDeleteHead({isLoader: false, disabled: true});
    setStateButtonDeleteTail({isLoader: false, disabled: true});
    setCurrentHead(circle(inputTextValue));
    await delay(SHORT_DELAY_IN_MS);
    setCurrentHead('head');
    linkedListkRef.current.prepend(inputTextValue);
    setStateHead(ElementStates.Modified);
    setArray(linkedListkRef.current.toArray());
    setInputTextValue('');
    await delay(SHORT_DELAY_IN_MS);
    setStateHead(ElementStates.Default);
    await delay(SHORT_DELAY_IN_MS);
    setStateButtonDeleteHead({isLoader: false, disabled: false});
    setStateButtonDeleteTail({isLoader: false, disabled: false});
  };

  const onClickAddTail = async () => {
    setStateButtonAddTail({isLoader: true, disabled: false});
    setStateButtonAddHead({isLoader: false, disabled: true});
    setStateButtonDeleteHead({isLoader: false, disabled: true});
    setStateButtonDeleteTail({isLoader: false, disabled: true});
    let size = linkedListkRef.current.getSize();
    setCurrentAdd({
      index: size - 1,
      head: circle(inputTextValue),
      tail: null,
    });
    await delay(SHORT_DELAY_IN_MS);
    setCurrentAdd({
      index: size - 1,
      head: null,
      tail: null,
    });
    linkedListkRef.current.append(inputTextValue);
    setArray(linkedListkRef.current.toArray());
    size = linkedListkRef.current.getSize();
    setState(Array(size).fill(ElementStates.Default));
    state[size - 1] = ElementStates.Modified;
    setState([...state]);
    setInputTextValue('');
    await delay(SHORT_DELAY_IN_MS);
    state[size - 1] = ElementStates.Default;
    setState([...state]);
    setStateButtonDeleteHead({isLoader: false, disabled: false});
    setStateButtonDeleteTail({isLoader: false, disabled: false});
  };

  const onClickDeleteHead = async () => {
    setStateButtonDeleteHead({isLoader: true, disabled: false});
    setStateButtonDeleteTail({isLoader: false, disabled: true});
    const currentArr = linkedListkRef.current.toArray();
    const value: string = currentArr[0] + '';
    const size = linkedListkRef.current.getSize();
    if (size === 1) {
      setCurrentTail(circle(value));
    }
    currentArr[0] = '';
    setArray([...currentArr]);
    setCurrentDelete({
      index: 0,
      head: null,
      tail: circle(value),
    });
    await delay(SHORT_DELAY_IN_MS);
    linkedListkRef.current.deleteHead();
    setArray(linkedListkRef.current.toArray());
    setCurrentDelete({
      index: 0,
      head: null,
      tail: null,
    });
    setCurrentTail('tail');
    if (size > 1) {
      setStateButtonDeleteHead({isLoader: false, disabled: false});
      setStateButtonDeleteTail({isLoader: false, disabled: false});
      setStateButtonDeleteByIndex({isLoader: false, disabled: false});
    } else {
      setStateButtonDeleteHead({isLoader: false, disabled: true});
      setStateButtonDeleteTail({isLoader: false, disabled: true});
      setStateButtonDeleteByIndex({isLoader: false, disabled: true});
    }
  };

  const onClickDeleteTail = async () => {
    setStateButtonDeleteTail({isLoader: true, disabled: false});
    setStateButtonDeleteHead({isLoader: false, disabled: true});
    const currentArr = linkedListkRef.current.toArray();
    const size = linkedListkRef.current.getSize();
    const value: string = currentArr[size-1] + '';
    currentArr[size-1] = '';
    setArray([...currentArr]);
    setCurrentTail(circle(value));
    await delay(SHORT_DELAY_IN_MS);
    linkedListkRef.current.deleteTail();
    setArray(linkedListkRef.current.toArray());
    setCurrentTail('tail');
    if (size > 1) {
      setStateButtonDeleteHead({isLoader: false, disabled: false});
      setStateButtonDeleteTail({isLoader: false, disabled: false});
      setStateButtonDeleteByIndex({isLoader: false, disabled: false});
    } else {
      setStateButtonDeleteHead({isLoader: false, disabled: true});
      setStateButtonDeleteTail({isLoader: false, disabled: true});
      setStateButtonDeleteByIndex({isLoader: false, disabled: true});
    }
  };

  const onClickAddByIndex = async () => {
    setStateButtonAddByIndex({isLoader: true, disabled: false});
    setStateButtonAddTail({isLoader: false, disabled: true});
    setStateButtonAddHead({isLoader: false, disabled: true});
    setStateButtonDeleteHead({isLoader: false, disabled: true});
    setStateButtonDeleteTail({isLoader: false, disabled: true});
    setStateButtonDeleteByIndex({isLoader: false, disabled: true});
    if (!array || (!inputIndexValue && inputIndexValue !== 0)) return;
    if (inputIndexValue >= linkedListkRef.current.getSize()) return;
    setCurrentHead(circle(inputTextValue));
    await delay(SHORT_DELAY_IN_MS);
    setCurrentHead('head');
    setStateHead(ElementStates.Changing);
    setArray(linkedListkRef.current.toArray());
    state[0] = ElementStates.Changing;
    const index = + inputIndexValue;
    for (let i = 1; i <= index; i++) {
      setCurrentAdd({
        index: i,
        head: circle(inputTextValue),
        tail: null,
      });
      state[i-1] = ElementStates.Changing;
      setState([...state]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setCurrentAdd({
      index: index,
      head: null,
      tail: null,
    });
    await delay(SHORT_DELAY_IN_MS);
    linkedListkRef.current.addByIndex(inputTextValue, index);
    setArray(linkedListkRef.current.toArray());
    state[index] = ElementStates.Modified;
    setCurrentHead('head');
    setState([...state]);
    setInputTextValue('');
    setInputIndexValue('');
    await delay(SHORT_DELAY_IN_MS);
    for (let i = 0; i <= index; i++) {
      state[i] = ElementStates.Default;
    }
    setState([...state]);
    setStateButtonAddByIndex({isLoader: false, disabled: true});
    setStateButtonDeleteHead({isLoader: false, disabled: false});
    setStateButtonDeleteTail({isLoader: false, disabled: false});
  };

  const onClickDeleteByIndex = async () => {
    setStateButtonDeleteByIndex({isLoader: true, disabled: false});
    setStateButtonAddTail({isLoader: false, disabled: true});
    setStateButtonAddHead({isLoader: false, disabled: true});
    setStateButtonDeleteHead({isLoader: false, disabled: true});
    setStateButtonDeleteTail({isLoader: false, disabled: true});
    setStateButtonAddByIndex({isLoader: false, disabled: true});
    const size = linkedListkRef.current.getSize();
    if (!array || (!inputIndexValue && inputIndexValue !== 0)) return;
    if (inputIndexValue >= size) return;
    const index = inputIndexValue ? + inputIndexValue : 0;
    for (let i = 0; i <= index; i++){
      state[i] = ElementStates.Changing;
      setState([...state]);
      await delay(SHORT_DELAY_IN_MS);
    }
    const currentArr = linkedListkRef.current.toArray();
    const value: string = currentArr[index] + '';
    currentArr[index] = '';
    setArray([...currentArr]);
    await delay(SHORT_DELAY_IN_MS);
    state[index] = ElementStates.Default;
    setState([...state]);
    if (index !== size - 1) {
      setCurrentDelete({
        index: index,
        head: null,
        tail: circle(value),
      });
    } else {
      setCurrentTail(circle(value));
    }
    await delay(SHORT_DELAY_IN_MS);
    setCurrentTail('tail');
    linkedListkRef.current.deleteByIndex(index);
    setArray(linkedListkRef.current.toArray());
    setInputIndexValue('');
    setCurrentDelete({
      index: 0,
      head: null,
      tail: null,
    });
    for (let i = 0; i < index; i++) {
      state[i] = ElementStates.Default;
    }
    setState([...state]);
    if (size > 1) {
      setStateButtonDeleteHead({isLoader: false, disabled: false});
      setStateButtonDeleteTail({isLoader: false, disabled: false});
      setStateButtonDeleteByIndex({isLoader: false, disabled: false});
    } else {
      setStateButtonDeleteHead({isLoader: false, disabled: true});
      setStateButtonDeleteTail({isLoader: false, disabled: true});
      setStateButtonDeleteByIndex({isLoader: false, disabled: true});
    }
  };

  return (
    <SolutionLayout title='Связный список'>
      <form
        name='list'
        className={listStyles.form}
      >
        <fieldset className={listStyles.fieldset}>
          <Input
            name='text'
            maxLength={4}
            isLimitText={true}
            value={inputTextValue}
            onChange={onChangeInputTextValue}
          />
          <Button
            text='Добавить&nbsp;в&nbsp;head'
            extraClass={listStyles.button_size_small}
            onClick={onClickAddHead}
            isLoader={stateButtonAddHead.isLoader}
            disabled={stateButtonAddHead.disabled}
          />
          <Button
            text='Добавить&nbsp;в&nbsp;tail'
            extraClass={listStyles.button_size_small}
            onClick={onClickAddTail}
            isLoader={stateButtonAddTail.isLoader}
            disabled={stateButtonAddTail.disabled}
          />
          <Button
            text='Удалить&nbsp;из&nbsp;head'
            extraClass={listStyles.button_size_small}
            onClick={onClickDeleteHead}
            isLoader={stateButtonDeleteHead.isLoader}
            disabled={stateButtonDeleteHead.disabled}
          />
          <Button
            text='Удалить&nbsp;из&nbsp;tail'
            extraClass={listStyles.button_size_small}
            onClick={onClickDeleteTail}
            isLoader={stateButtonDeleteTail.isLoader}
            disabled={stateButtonDeleteTail.disabled}
          />
        </fieldset>
        <fieldset className={listStyles.fieldset}>
          <Input
            placeholder='Введите индекс'
            value={inputIndexValue || inputIndexValue === 0 ? inputIndexValue : ''}
            type='number'
            onChange={onChangeInputIndexValue}
          />
          <Button
            text='Добавить&nbsp;по&nbsp;индексу'
            extraClass={listStyles.button_size_big}
            onClick={onClickAddByIndex}
            isLoader={stateButtonAddByIndex.isLoader}
            disabled={stateButtonAddByIndex.disabled}
          />
          <Button
            text='Удалить&nbsp;по&nbsp;индексу'
            extraClass={listStyles.button_size_big}
            onClick={onClickDeleteByIndex}
            isLoader={stateButtonDeleteByIndex.isLoader}
            disabled={stateButtonDeleteByIndex.disabled}
          />
        </fieldset>
      </form>
      <ul className={listStyles.list}>
        {array?.map((el, index) => (
          <li key={index} className={listStyles.item}>
            <Circle
              letter={`${el}`}
              index={index}
              head={
                index === currentAdd.index && index !== head ? currentAdd.head : null
                || index === head ? currentHead : null
              }
              tail={
                index === array.length - 1 ? currentTail : null
                || index === currentDelete.index ? currentDelete.tail : null
              }
              state={
                index === head && !state[index]
                ? stateHead
                : state[index]
              }
            />
            {(index !== array.length - 1) 
            && <ArrowIcon />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
