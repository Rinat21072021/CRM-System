import { IconButton } from '../../common/components/iconButton/IconButton';
import style from '../todolist/TodoStyle.module.scss';
import { useState } from 'react';
import cancelIcon from '../../assets/img/cancelIcon.svg';
import editIcon from '../../assets/img/editIcon.svg';
import removeIcon from '../../assets/img/removeIcon.svg';
import saveIcon from '../../assets/img/saveIcon.svg';
import { useRemoveTaskMutation } from '../../api/api';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
  created: string;
  editTitleHeading: (id: number, title:string)=>void
  changeTaskStatus: (id: number, isDone: boolean) => void;
};

export const Task = ({
  id,
  title,
  isDone,
  editTitleHeading,
  changeTaskStatus,
}: TaskType) => {
  const [isEdit, setEdit] = useState(false);
  const [TaskTitle, setTaskTitle] = useState(title);
  const [removeTask] = useRemoveTaskMutation();
  

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
    editTitleHeading(taskId, title);
    setEdit(false);
  };

  const handleRemoveTask = async (id: number) => {
   await removeTask({ id });
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
                variant={'save'}
                onClick={() => {
                  handleSaveTask(id, TaskTitle);
                }}
              ></IconButton>
              <IconButton
                icon={cancelIcon}
                variant={'cancel'}
                onClick={handleCancelEditTask}
              ></IconButton>
            </>
          ) : (
            <>
              <IconButton
                icon={editIcon}
                variant={'edit'}
                onClick={handleEditTask}
              ></IconButton>
              <IconButton
                icon={removeIcon}
                variant={'remove'}
                className={title === 'remove' ? style.remove : ''}
                onClick={() => handleRemoveTask(id)}
              ></IconButton>
            </>
          )}
        </div>
      </li>
    </>
  );
};
