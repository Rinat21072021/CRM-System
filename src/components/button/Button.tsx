import { ButtonHTMLAttributes, ReactNode } from 'react';
import style from './Button.module.scss';

export type ButtonType = {
  onClick: () => void;
  disabled?: boolean;
  title?: string
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ onClick, disabled, title, children }: ButtonType) => {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <button
      className={title === 'remove' ? style.remove : style.default}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};
