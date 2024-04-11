import { useId } from 'react';
import * as styles from './Input.module.css';

const Input = ({ label, ...props }) => {
  const id = useId();

  return (
    <div>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input className={styles.input} id={id} {...props} />
    </div>
  );
};

export default Input;
