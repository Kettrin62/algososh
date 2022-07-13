import { FC } from 'react';
import formStyles from './form.module.css';

interface IFormProps {
  name: string;
  onSubmit?: (e: React.FormEvent) => void;
  extraClass?: string;
};

const Form: FC<IFormProps> = (props) => {
  const className = `${formStyles.form__info} ${props.extraClass}`;
  return (
    <form name={props.name} className={formStyles.form} onSubmit={props.onSubmit}>
      <fieldset className={className}>
        {props.children}
      </fieldset>
    </form>
  )
};

export default Form;