import style from './Button.module.scss';
import { ButtonType } from '../../type/type';

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
