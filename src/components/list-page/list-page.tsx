import React from 'react';
import { randomArr } from '../../utils/functions';
import Form from '../form/form';
import { Button } from '../ui/button/button';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { LinkedList } from './class-linked-list';
import listStyles from './list-page.module.css';

export const ListPage: React.FC = () => {

  const list = new LinkedList<number>();
  list.insertAt(12, 0);
  list.insertAt(13, 0);
  list.insertAt(114, 0);
  list.append(8);
  list.print(); // 13 114 12

  const [minLen, maxLen, max] = [3, 6, 100]

  const array = randomArr(minLen, maxLen, max);
  console.log(array);
  
  


  return (
    <SolutionLayout title='Связный список'>
      <form
        name='list'
        className={listStyles.form}
      >
        <fieldset className={listStyles.fieldset}>
          <Input
            maxLength={4}
            isLimitText={true}
          />
          <Button
            text='Добавить&nbsp;в&nbsp;head'
            extraClass={listStyles.button_size_small}
          />
          <Button
            text='Добавить&nbsp;в&nbsp;tail'
            extraClass={listStyles.button_size_small}
          />
          <Button
            text='Удалить&nbsp;из&nbsp;head'
            extraClass={listStyles.button_size_small}
          />
          <Button
            text='Удалить&nbsp;из&nbsp;tail'
            extraClass={listStyles.button_size_small}
          />
        </fieldset>
        <fieldset className={listStyles.fieldset}>
          <Input

          />
          <Button
            text='Добавить&nbsp;по&nbsp;индексу'
            extraClass={listStyles.button_size_big}
          />
          <Button
            text='Удалить&nbsp;по&nbsp;-индексу'
            extraClass={listStyles.button_size_big}
          />
        </fieldset>
      </form>
      <ArrowIcon />
    </SolutionLayout>
  );
};
