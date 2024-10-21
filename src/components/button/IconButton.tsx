import { ButtonHTMLAttributes} from 'react';
import style from './Button.module.scss';

export type IconButtonType = {
  onClick: () => void;
  disabled?: boolean;
  variant?: string
  icon:string
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ onClick, disabled, variant, icon }: IconButtonType) => {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <button
      className={variant === 'remove' ? style.remove : style.default}
      disabled={disabled}
      onClick={handleOnClick}
    >
      <img src={icon} alt="img" />
    </button>
  );
};
