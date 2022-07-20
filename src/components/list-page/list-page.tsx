import React, { useEffect, useRef, useState } from 'react';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays';
import { TElement } from '../../types/data';
import { ElementStates } from '../../types/element-states';
import { delay, randomArr } from '../../utils/functions';
import Form from '../form/form';
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

  const [currentHead, setCurrentHead] = useState<string | React.ReactElement>();

  const [stateHead, setStateHead] = useState<ElementStates>();
  const [stateAdd, setStateAdd] = useState<ElementStates[]>(Array(linkedListkRef.current.getSize()).fill(ElementStates.Default));

  const [currentAdd, setCurrentAdd] = useState<Current>({
    index: null,
    head: null,
    tail: null,
  })

  useEffect(() => {
    setArray(linkedListkRef.current.toInitArray());
    setHead(0);
  }, [])

  const onChangeInputTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(e.target.value);
  };

  const onChangeInputIndexValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: number = + e.target.value;
    setInputIndexValue(target);
  };

  const circle: React.ReactElement = (
    <Circle
      letter={inputTextValue}
      state={ElementStates.Changing}
      isSmall={true}
    />
  );

  const onClickAddHead = async () => {
    setCurrentHead(circle);
    await delay(SHORT_DELAY_IN_MS);
    setCurrentHead('head');
    linkedListkRef.current.prepend(inputTextValue);
    setStateHead(ElementStates.Modified);
    setArray(linkedListkRef.current.toArray());
    setInputTextValue('');
    await delay(SHORT_DELAY_IN_MS);
    setStateHead(ElementStates.Default);
  };

  const onClickAddTail = async () => {
    let size = linkedListkRef.current.getSize();
    setCurrentAdd({
      index: size - 1,
      head: circle,
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
    setStateAdd(Array(size).fill(ElementStates.Default));
    stateAdd[size - 1] = ElementStates.Modified;
    setStateAdd([...stateAdd]);
    setInputTextValue('');
    await delay(SHORT_DELAY_IN_MS);
    stateAdd[size - 1] = ElementStates.Default;
    setStateAdd([...stateAdd]);
  };

  const onClickDeleteHead = async () => {
    await delay(SHORT_DELAY_IN_MS);
    linkedListkRef.current.deleteHead();
    setArray(linkedListkRef.current.toArray());
  };

  const onClickDeleteTail = async () => {
    await delay(SHORT_DELAY_IN_MS);
    linkedListkRef.current.deleteTail();
    setArray(linkedListkRef.current.toArray());
  };

  const onClickAddByIndex = async () => {
    if (!array || !inputIndexValue) return;
    if (inputIndexValue >= linkedListkRef.current.getSize()) return;

    setCurrentHead(circle);
    await delay(SHORT_DELAY_IN_MS);
    setCurrentHead('head');
    setStateHead(ElementStates.Changing);
    
    setArray(linkedListkRef.current.toArray());
    
    stateAdd[0] = ElementStates.Changing;

    const index = + inputIndexValue;

    for (let i = 1; i <= index; i++) {
      setCurrentAdd({
        index: i,
        head: circle,
        tail: null,
      });
      stateAdd[i-1] = ElementStates.Changing;
      setStateAdd([...stateAdd]);
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
    stateAdd[index] = ElementStates.Modified;
    setStateAdd([...stateAdd]);
    setInputTextValue('');
    setInputIndexValue('');
    await delay(SHORT_DELAY_IN_MS);
    for (let i = 0; i <= index; i++) {
      stateAdd[i] = ElementStates.Default;
    }
    setStateAdd([...stateAdd]);
  };

  const onClickDeleteByIndex = async () => {
    await delay(SHORT_DELAY_IN_MS);
    const index = inputIndexValue ? + inputIndexValue : 0;
    linkedListkRef.current.deleteByIndex(index);
    setArray(linkedListkRef.current.toArray());
    setInputIndexValue('');
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
          />
          <Button
            text='Добавить&nbsp;в&nbsp;tail'
            extraClass={listStyles.button_size_small}
            onClick={onClickAddTail}
          />
          <Button
            text='Удалить&nbsp;из&nbsp;head'
            extraClass={listStyles.button_size_small}
            onClick={onClickDeleteHead}
          />
          <Button
            text='Удалить&nbsp;из&nbsp;tail'
            extraClass={listStyles.button_size_small}
            onClick={onClickDeleteTail}
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
          />
          <Button
            text='Удалить&nbsp;по&nbsp;индексу'
            extraClass={listStyles.button_size_big}
            onClick={onClickDeleteByIndex}
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
                index === currentAdd.index
                ? currentAdd.head
                : null
                || index === head
                ? currentHead
                : null
              }
              tail={index === array.length - 1 ? 'tail' : null}
              state={
                index === head && !stateAdd[index]
                ? stateHead
                : stateAdd[index]
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
