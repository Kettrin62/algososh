import { FC } from 'react';
import formStyles from './form.module.css';

interface IFormProps {
  // class?: string;
  name: string;
  onSubmit: (e: React.FormEvent) => void;
};

const Form: FC<IFormProps> = (props) => {
  return (
    <form name={props.name} className={formStyles.form} onSubmit={props.onSubmit}>
      <fieldset className={formStyles.form__info}>
        {props.children}
      </fieldset>
    </form>
  )
};

export default Form;