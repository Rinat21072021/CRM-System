import style from './Button.module.scss';
import { ButtonType } from '../../type/type';

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
