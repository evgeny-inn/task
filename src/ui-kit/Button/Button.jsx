import cn from 'classnames';
import * as styles from './Button.module.css';

const Button = ({ children, variant, ...props }) => {
  const className = cn('button', styles[variant]);

  return (
    <button className={className} {...props}>{children}</button>
  );
};

export default Button;
