import { ButtonHTMLAttributes } from 'react';
import style from './Button.module.scss';
import { VariantIconButton } from '../../type/type';

export type IconButtonType = {
  onClick: () => void;
  disabled?: boolean;
  variant?: VariantIconButton;
  icon: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({
  onClick,
  disabled,
  variant,
  icon,
}: IconButtonType) => {
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
