import { ChangeEvent } from 'react';
import style from './InputText.module.scss';

export type InputTextType = {
  text: string;
  setText: (text: string) => void;
  setError: (error: boolean) => void;
  onClick?: () => void;
};

export const InputText = ({
  text,
  setText,
  setError,
  onClick,
}: InputTextType) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
    setError(false);
  }

  return (
    <>
      <input
        type="text"
        value={text}
        placeholder="Task To Be Done"
        onChange={handleOnChange}
        className={style.default}
      />
      
      <button className = {style.addBtn}onClick={onClick}>Add</button>
    </>
  );
};
