import cn from 'classnames';
import * as styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'primary' | 'outlined' | 'text';
}

const Button = ({ children, variant, ...props }: ButtonProps) => {
  const className = cn('button', styles[variant]);

  return (
    <button className={className} {...props}>{children}</button>
  );
};

export default Button;
