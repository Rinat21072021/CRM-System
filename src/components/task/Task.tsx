import { Icons } from '../../img/Icons';
import { Button } from '../button/Button';
import style from '../../components/todolist/TodoStyle.module.scss';
import { useState } from 'react';
import { InputText } from '../inputText/InputText';
import { TaskType } from '../../type/type';

export const Task = ({
  title,
  id,
  isDone,
  created,
  editTaskTitle,
  removeTask,
  changeTaskStatus,
  setError,
}: TaskType) => {
  const [edit, setEdit] = useState(true);
  const [valueTaskTitle, setValueTaskTitle] = useState(title);

  const handleChangeTask = (taskId: number, isDone: boolean) => {
    changeTaskStatus(taskId, isDone);
  };

  const handleEditTask = () => {
    setEdit(false);
  };

  const handleCancelEditTask = () => {
    setEdit(true);
    setValueTaskTitle(title);
  };

  const handleSaveTask = (taskId: number, title: string) => {
    editTaskTitle(taskId, title);
    setEdit(true);
  };

  return (
    <>
      <li key={id} className={style.itemTask}>
        <div className={style.wrapperItemsText}>
          <input
            type="checkbox"
            checked={isDone}
            onChange={(e) => handleChangeTask(id, e.currentTarget.checked)}
          />

          {edit ? (
            <span className={isDone ? style.taskDone : style.task}>
              {title}
            </span>
          ) : (
            <InputText
              text={valueTaskTitle}
              setText={setValueTaskTitle}
              setError={setError}
            />
          )}
        </div>
        <div className={style.wrapperItemsBtn}>
          {edit ? (
            <>
              <Button title={'edit'} onClick={handleEditTask}>
                <Icons name="EditIcon" color="black" />
              </Button>
              <Button title={'remove'} onClick={() => removeTask(id)}>
                <Icons name="RemoveIcon" color="black" />
              </Button>
            </>
          ) : (
            <>
              <Button
                title={'saveIcon'}
                onClick={() => {
                  handleSaveTask(id, valueTaskTitle);
                }}
              >
                <Icons name="SaveIcon" color="black" />
              </Button>
              <Button title={'cancel'} onClick={handleCancelEditTask}>
                <Icons name="CancelIcon" color="black" />
              </Button>
            </>
          )}
        </div>
      </li>
    </>
  );
};
