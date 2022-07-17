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

export const StackPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');


  const stack = new Stack<TElement<string>>();

  const stackRef = useRef(stack);
  let size = stackRef.current.getSize();
  
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



  useEffect(() => {
    if(inputValue) {
      setStateButtonAdd({...stateButtonAdd, disabled: false});
      // setStateButtonRemove({...stateButtonRemove, disabled: false});
      // setStateButtonClear({...stateButtonClear, disabled: false});
    } else {
      setStateButtonAdd({...stateButtonAdd, disabled: true});
      // setStateButtonRemove({...stateButtonRemove, disabled: true});
      // setStateButtonClear({...stateButtonClear, disabled: true});
    }
  }, [inputValue]);

  
  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const stackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(st.getElements());
    inputValue &&
    stackRef.current.push({
      value: inputValue,
      state: ElementStates.Default,
    })


    
    setInputValue('');

  };


  const onClickReset = () => {
    // setStack([]);

  }

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
            onInput={onChangeInputValue}
            value={inputValue}
          />
          <Button 
            text='Добавить'
            type='submit'
            isLoader={stateButtonAdd.isLoader}
            disabled={stateButtonAdd.disabled}
            // onClick={onClickAdd}
          />
          <Button 
            text='Удалить'
            type='button'
            isLoader={stateButtonRemove.isLoader}
            disabled={stateButtonRemove.disabled}
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
      {stack && (
        <ul className={stackStyles.list}>
          {/* {stack.map((el, index) => (
            <li key = {index}>
              <Circle
                letter={el.value}
                state={el.state}
                index={index}
              />
            </li>
          ))} */}
        </ul>
      )}
    </SolutionLayout>
  );
};
