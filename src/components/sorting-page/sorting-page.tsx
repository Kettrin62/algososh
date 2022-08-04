import React, { useState, useEffect } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { TElement, TSelector } from '../../types/data';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { 
  delay, 
  generateBubbleSort, 
  generateSelectionSort, 
  randomArr
} from '../../utils/functions';
import Form from '../form/form';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import sortingStyles from './sorting-page.module.css';

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TElement<number>[]>();
  const [radioInputValue, setRadioInputValue] = useState('');
  const [stateButtonAscending, setStateButtonAscending] = useState({
    isLoader: false,
    disabled: false,
  });
  const [stateButtonDescending, setStateButtonDescending] = useState({
    isLoader: false,
    disabled: false,
  });
  const [disabled, setDisabled] = useState(false);
  const [minLen, maxLen, max] = [3, 17, 100];

  useEffect(() => {
    setArray(randomArr(minLen, maxLen, max));
    setRadioInputValue('selection');
  }, []);

  const selectionSort = async (arr: TElement<number>[], selector: TSelector) => {
    if (arr[0].state !== ElementStates.Default) {
      arr.forEach(item => item.state = ElementStates.Default);
    }
    const { length } = arr;
    let generator = generateSelectionSort(arr, selector);
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        setArray(generator.next().value);
        await delay(SHORT_DELAY_IN_MS);
        setArray(generator.next().value);
      }
    }
    setArray(generator.next().value);
    setDisabled(false);
    setStateButtonAscending({
      isLoader: false,
      disabled: false,
    });
    setStateButtonDescending({
      isLoader: false,
      disabled: false,
    });
  };

  const bubbleSort = async (arr: TElement<number>[], selector: TSelector) => {
    if (arr[0].state !== ElementStates.Default) {
      arr.forEach(item => item.state = ElementStates.Default);
    }
    let generator = generateBubbleSort(arr, selector);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setArray(generator.next().value);
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    setArray(generator.next().value);
    setDisabled(false);
    setStateButtonAscending({
      isLoader: false,
      disabled: false,
    });
    setStateButtonDescending({
      isLoader: false,
      disabled: false,
    });
  };

  const onClickAscending = () => {
    radioInputValue === 'selection' && array && selectionSort(array, 'ascending');
    radioInputValue === 'bubble' && array && bubbleSort(array, 'ascending');
    setStateButtonAscending({...stateButtonAscending, isLoader: true});
    setStateButtonDescending({...stateButtonDescending, disabled: true});
    setDisabled(true);
  };

  const onClickDescending = () => {
    radioInputValue === 'selection' && array && selectionSort(array, 'descending');
    radioInputValue === 'bubble' && array && bubbleSort(array, 'descending');
    setStateButtonAscending({...stateButtonAscending, disabled: true});
    setStateButtonDescending({...stateButtonDescending, isLoader: true});
    setDisabled(true);
  };

  const onChangeRadioInputValue = (value: string) => {
    setRadioInputValue(value);
  };

  const onClickRandom = () => {
    setArray(randomArr(minLen, maxLen, max));
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <Form 
        name='sorting' 
        extraClassForm={sortingStyles.form}
        extraClassFieldset={sortingStyles.fieldset}
      >
        <div className={sortingStyles.radio}>
          <RadioInput 
            label='Выбор' 
            name="choice" 
            value='selection'
            checked={radioInputValue === 'selection'}
            onChange={() => onChangeRadioInputValue('selection')}
          />
          <RadioInput 
            label='Пузырёк' 
            name="choice" 
            value='bubble'
            checked={radioInputValue === 'bubble'}
            onChange={() => onChangeRadioInputValue('bubble')}
          />
        </div>
        <Button 
          text='По&nbsp;возрастанию' 
          sorting={Direction.Ascending} 
          onClick={onClickAscending}
          isLoader={stateButtonAscending.isLoader}
          disabled={stateButtonAscending.disabled}
          extraClass={sortingStyles.size_ascending}
        />
        <Button 
          text='По&nbsp;убыванию' 
          sorting={Direction.Descending} 
          onClick={onClickDescending}
          isLoader={stateButtonDescending.isLoader}
          disabled={stateButtonDescending.disabled}
          extraClass={sortingStyles.size_descending}
        />
        <Button 
          text='Новый&nbsp;массив' 
          extraClass={sortingStyles.button}
          onClick={onClickRandom}
          disabled={disabled}
        />
      </Form>
      <ul className={sortingStyles.list}>
        {array?.map((el, index) => (
          <li key={index}>
            <Column 
              index={el.value}
              state={el.state}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
