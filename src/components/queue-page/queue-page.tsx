import React from 'react';
import { Queue } from '../../utils/classes/class-queue';
import Form from '../form/form';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import queueStyles from './queue-page.module.css';

export const QueuePage: React.FC = () => {

  const queue = new Queue<number>(7);

  const onQueueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          // onChange={onChangeInputValue}
          // value={inputValue}
        />
        <Button
          text='Добавить'
          type='submit'
          // isLoader={stateButtonAdd.isLoader}
          // disabled={stateButtonAdd.disabled}
        />
        <Button 
          text='Удалить'
          type='button'
          // isLoader={stateButtonRemove.isLoader}
          // disabled={stateButtonRemove.disabled}
          // onClick={onClickRemove}
        />
        <Button 
          text='Очистить'
          type='reset'
          extraClass={queueStyles.button}
          // isLoader={stateButtonClear.isLoader}
          // disabled={stateButtonClear.disabled}
          // onClick={onClickReset}
        />
      </Form>
    </SolutionLayout>
  );
};
