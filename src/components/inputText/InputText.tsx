import { ChangeEvent } from 'react';
import style from './InputText.module.scss';
import { InputTextType } from '../../type/type';



export const InputText = ({ text, setText, setError }: InputTextType) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
    setError(false);
  };
  return (
    <input
      type="text"
      value={text}
      placeholder="Task To Be Done"
      onChange={handleOnChange}
      className={style.default}
    />
  );
};
