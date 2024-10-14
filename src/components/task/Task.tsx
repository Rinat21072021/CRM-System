import { Icons } from '../../img/Icons';
import { Button } from '../button/Button';
import style from '../../components/todolist/TodoStyle.module.scss';
import { useState } from 'react';
import { InputText } from '../inputText/InputText';

export type TaskType = {
  title: string;
  id: number;
  isDone: boolean;
  created: string;
  editTaskTitle: (id: number, title: string) => void;
  removeTask: (id: number) => void;
  changeTaskStatus: (id: number, isDone: boolean) => void;
  setError: (error: boolean) => void;
};

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
  const [isEdit, setEdit] = useState<boolean>(false);
  const [valueTaskTitle, setValueTaskTitle] = useState<string>(title);

  const handleChangeTask = (taskId: number, isDone: boolean) => {
    changeTaskStatus(taskId, isDone);
  };

  const handleEditTask = () => {
    setEdit(true);
  };

  const handleCancelEditTask = () => {
    setEdit(false);
    setValueTaskTitle(title);
  };

  const handleSaveTask = (taskId: number, title: string) => {
    editTaskTitle(taskId, title);
    setEdit(false);
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

          {isEdit ? (
            <InputText
              text={valueTaskTitle}
              setText={setValueTaskTitle}
              setError={setError}
            />
          ) : (
            <span className={isDone ? style.taskDone : style.task}>
              {title}
            </span>
          )}
        </div>
        <div className={style.wrapperItemsBtn}>
          {isEdit ? (
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
          ) : (
            <>
              <Button title={'edit'} onClick={handleEditTask}>
                <Icons name="EditIcon" color="black" />
              </Button>
              <Button title={'remove'} onClick={() => removeTask(id)}>
                <Icons name="RemoveIcon" color="black" />
              </Button>
            </>
          )}
        </div>
      </li>
    </>
  );
};
