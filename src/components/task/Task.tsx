import { IconButton } from '../iconButton/IconButton';
import style from '../../components/todolist/TodoStyle.module.scss';
import { useState } from 'react';
import cancelIcon from '../../assets/img/cancelIcon.svg';
import editIcon from '../../assets/img/editIcon.svg';
import removeIcon from '../../assets/img/removeIcon.svg';
import saveIcon from '../../assets/img/saveIcon.svg';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
  created: string;
  editTaskTitle: (id: number, title: string) => void;
  removeTask: (id: number) => void;
  changeTaskStatus: (id: number, isDone: boolean) => void;
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
              <IconButton
                icon={saveIcon}
                title={'saveIcon'}
                onClick={() => {
                  handleSaveTask(id, TaskTitle);
                }}
              ></IconButton>
              <IconButton
                icon={cancelIcon}
                title={'cancel'}
                onClick={handleCancelEditTask}
              ></IconButton>
            </>
          ) : (
            <>
              <IconButton
                icon={editIcon}
                title={'edit'}
                onClick={handleEditTask}
              ></IconButton>
              <IconButton
                icon={removeIcon}
                variant={'remove'}
                className={title === 'remove' ? style.remove : ''}
                onClick={() => removeTask(id)}
              ></IconButton>
            </>
          )}
        </div>
      </li>
    </>
  );
};
