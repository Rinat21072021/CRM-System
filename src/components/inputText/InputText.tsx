import { ChangeEvent, useState } from 'react';
import style from './InputText.module.scss';

export type InputTextType = {
  onClick: (title:string) => void 
};

export const InputText = ({
  onClick
}: InputTextType) => {

const [title, setTitle] = useState('')
const [error, setError] = useState<boolean>(false);
const validText = title.length > 2 && title.length < 64;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setError(false);
  }

  const handleAddTask = () => {
    if (validText) {
      onClick(title);
      setTitle('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <input
        type="text"
        value={title}
        placeholder="Task To Be Done"
        onChange={handleOnChange}
        className={style.default}
      />
      
      <button className = {style.addBtn}onClick={handleAddTask}>Add</button>
       <div className={error ? style.error : style.notError}>
          Text must be more than 2 and less than 62 characters
        </div>
    </>
  );
};
