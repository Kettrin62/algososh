import { FC } from 'react';
import formStyles from './form.module.css';

interface IFormProps {
  name: string;
  onSubmit?: (e: React.FormEvent) => void;
  extraClassForm?: string;
  extraClassFieldset?: string;
};

const Form: FC<IFormProps> = (props) => {
  const classNameForm = `${formStyles.form} ${props.extraClassForm}`;
  const classNameFieldset = `${formStyles.form__info} ${props.extraClassFieldset}`;
  return (
    <form name={props.name} className={classNameForm} onSubmit={props.onSubmit}>
      <fieldset className={classNameFieldset}>
        {props.children}
      </fieldset>
    </form>
  )
};

export default Form;