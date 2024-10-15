import style from './InputText.module.scss';
import { InputTextType } from '../../type/type';
import { useInputText } from './hooks/useInputText';

export const InputText = ({
  text,
  setText,
  setError,
  onClick,
}: InputTextType) => {
  const { handleOnChange } = useInputText(setText, setError);

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
