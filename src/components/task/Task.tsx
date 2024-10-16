import { Icons } from '../../img/Icons';
import { Button } from '../button/Button';
import style from '../../components/todolist/TodoStyle.module.scss';
import { useState } from 'react';
import { TaskType } from '../../type/type';

export const Task = ({
  title,
  id,
  isDone,
  editTaskTitle,
  removeTask,
  changeTaskStatus,
}: TaskType) => {
  const [isEdit, setEdit] = useState(true);
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

          {isEdit ? (
            <span 
              className={isDone ? style.taskDone : style.task}>
              {title}
            </span>
          ) : (
            <input
              value={valueTaskTitle}
              onChange={(e) => setValueTaskTitle(e.currentTarget.value)}
            />
          )}
        </div>
        <div className={style.wrapperItemsBtn}>
          {isEdit ? (
            <>
              <Button title={'edit'} onClick={handleEditTask}>
                <Icons name="EditIcon" color="black" />
              </Button>
              <Button title={'remove'} className={title=== 'remove' ? style.remove: ""} onClick={() => removeTask(id)}>
                <Icons name="RemoveIcon" color="red" />
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
