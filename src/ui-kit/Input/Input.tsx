import { useId } from 'react';
import * as styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  const id = useId();

  return (
    <>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input className={styles.input} id={id} {...props} />
    </>
  );
};

export default Input;
