import { Icons } from '../../img/Icons';
import { Button } from '../button/Button';
import style from '../../components/todolist/TodoStyle.module.scss';
import { useState } from 'react';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
  created: string;
  editTaskTitle: (id: number, title: string) => void;
  removeTask: (id: number) => void;
  changeTaskStatus: (id: number, isDone: boolean) => void;
  setError: (error: boolean) => void;
};

export const Task = ({
  id,
  title,
  isDone,
  editTaskTitle,
  removeTask,
  changeTaskStatus,
}: TaskType) => {
  const [isEdit, setEdit] = useState(false);
  const [TaskTitle, setTaskTitle] = useState(title);

  const handleChangeTask = (taskId: number, isDone: boolean) => {
    changeTaskStatus(taskId, isDone);
  };

  const handleEditTask = () => {
    setEdit(true);
  };

  const handleCancelEditTask = () => {
    setEdit(false);
    setTaskTitle(title);
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
            <input
              value={TaskTitle}
              onChange={(e) => setTaskTitle(e.currentTarget.value)}
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
                  handleSaveTask(id, TaskTitle);
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
              <Button
                title={'remove'}
                className={title === 'remove' ? style.remove : ''}
                onClick={() => removeTask(id)}
              >
                <Icons name="RemoveIcon" color="red" />
              </Button>
            </>
          )}
        </div>
      </li>
    </>
  );
};
