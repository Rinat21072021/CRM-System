import { ButtonHTMLAttributes, ReactNode } from 'react';
import style from './Button.module.scss';



type ButtonType = {
  onClick: () => void;
  disabled?: boolean;
  typeClasses?: string
  classes?: string;
  children:ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  onClick,
  disabled,
  typeClasses,
  classes,
  children
}: ButtonType) => {
  const handleOnClick = () => {
    onClick();
  };

    {if (typeClasses === 'add'){
      return (
      <button
        className={style.add}
        disabled={disabled}
        onClick={handleOnClick}>
        {children}
      </button>
      )
    }else{
      return (
        <button
          className={classes}
          disabled={disabled}
          onClick={handleOnClick}>
          {children}
        </button>
      )
    }
  
  }
   
  
};
