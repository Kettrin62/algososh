import React from 'react';
import { Direction } from '../../types/direction';
import Form from '../form/form';
import { Button } from '../ui/button/button';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import sortingStyles from './sorting-page.module.css';

export const SortingPage: React.FC = () => {



  return (
    <SolutionLayout title='Сортировка массива'>
      <Form name='sorting' extraClass={sortingStyles.form}>
        <RadioInput 
          label='Выбор' 
          name="choice" 
          checked 
        />
        <RadioInput 
          label='Пузырёк' 
          name="choice" 
        />
        <Button 
          text='По&nbsp;возрастанию' 
          sorting={Direction.Ascending} 
        />
        <Button 
          text='По&nbsp;убыванию' 
          sorting={Direction.Descending} 
        />
        <Button 
          text='Новый&nbsp;массив' 
        />
      </Form>
    </SolutionLayout>
  );
};

// export enum Direction {
//   Ascending = "ascending",
//   Descending = "descending",
// }

{/* <RadioInput
            label="Выбор"
            name="sort"
            value="check"
            onChange={() => onChangeRadio("check")}
            defaultChecked
          />
          <RadioInput
            label="Пузырёк"
            name="sort"
            value="bubble"
            onChange={() => onChangeRadio("bubble")}
          /> */}
