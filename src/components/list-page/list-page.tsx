import React, { useEffect, useRef, useState } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay, randomArr } from '../../utils/functions';
import Form from '../form/form';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { LinkedList } from './class-linked-list';
import listStyles from './list-page.module.css';

export const ListPage: React.FC = () => {

  const [inputTextValue, setInputTextValue] = useState<string>('');
  const [inputIndexValue, setInputIndexValue] = useState<number | string>();

  const [minLen, maxLen, max] = [3, 6, 100]
  
  const linkedList = new LinkedList<number | string>(randomArr(minLen, maxLen, max));
  const linkedListkRef = useRef(linkedList);
  
  const [array, setArray] = useState<Array<string | number>>();
  const [head, setHead] = useState<number>();
  const [tail, setTail] = useState<number>();

  const [state, setState] = useState({
    text: '',
    index: '',
  });

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

  const onClickAddHead = async () => {
    await delay(SHORT_DELAY_IN_MS);
    linkedListkRef.current.prepend(inputTextValue);
    setArray(linkedListkRef.current.toArray());
    setInputTextValue('');
  };

  const onClickAddTail = async () => {
    await delay(SHORT_DELAY_IN_MS);
    linkedListkRef.current.append(inputTextValue);
    setArray(linkedListkRef.current.toArray());
    setInputTextValue('');
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
    await delay(SHORT_DELAY_IN_MS);
    const index = inputIndexValue ? + inputIndexValue : 0;
    linkedListkRef.current.addByIndex(inputTextValue, index);
    setArray(linkedListkRef.current.toArray());
    setInputTextValue('');
    setInputIndexValue('');
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
        // onReset={onReset}
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
              head={index === head ? 'head' : null}
              tail={index === array.length - 1 ? 'tail' : null}
            />
            {(index !== array.length - 1) 
            && <ArrowIcon />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
