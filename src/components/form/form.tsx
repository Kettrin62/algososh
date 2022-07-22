import { FC } from 'react';
import formStyles from './form.module.css';

interface IFormProps {
  name: string;
  onSubmit?: (e: React.FormEvent) => void;
  extraClassForm?: string;
  extraClassFieldset?: string;
};

const Form: FC<IFormProps> = ({
  name,
  onSubmit,
  extraClassForm,
  extraClassFieldset,
  children,
}) => {
  const classNameForm = `${formStyles.form} ${extraClassForm}`;
  const classNameFieldset = `${formStyles.form__info} ${extraClassFieldset}`;

  return (
    <form 
      name={name} 
      className={classNameForm} 
      onSubmit={onSubmit}
    >
      <fieldset className={classNameFieldset}>
        {children}
      </fieldset>
    </form>
  )
};

export default Form;