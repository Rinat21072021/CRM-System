import { ButtonHTMLAttributes} from 'react';
import style from './Button.module.scss';

export type ButtonType = {
  onClick: () => void;
  disabled?: boolean;
  title?: string
  icon:string
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ onClick, disabled, title, icon }: ButtonType) => {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <button
      className={title === 'remove' ? style.remove : style.default}
      disabled={disabled}
      onClick={handleOnClick}
    >
      <img src={icon} alt="img" />
    </button>
  );
};
