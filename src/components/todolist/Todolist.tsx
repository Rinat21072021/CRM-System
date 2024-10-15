import { useState } from 'react';
import { Button } from '../button/Button';
import { InputText } from '../inputText/InputText';
import style from './TodoStyle.module.scss';
import { Task } from '../task/Task';
import { filterValueType } from '../../type/type';
import { useTodolist } from './hooks/useTodolist';

export const Todolist = () => {
  const {
    filerTask,
    addTask,
    editTaskTitle,
    removeTask,
    changeTaskStatus,
    setFilteredTasks,
    resultTasks,
    countAllTasks,
    countCompletedTasks,
    countInWorkTasks,
  } = useTodolist();

  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const validText = text.length > 2 && text.length < 64;

  const handleAddTask = () => {
    if (validText) {
      addTask(text);
      setText('');
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleFiltered = (filter: filterValueType) => {
    setFilteredTasks(filter);
  };

  return (
    <div className={style.todoList}>
      <div className={style.addInput}>
        <InputText setText={setText} setError={setError} text={text} />
        <Button typeClasses="add" onClick={() => handleAddTask()}>
          {<span>{'Add'}</span>}
        </Button>
        <div className={error ? style.error : style.notError}>
          Text must be more than 2 and less than 62 characters
        </div>
      </div>
      <div className={style.filterBtn}>
        <Button
          classes={filerTask === 'all' ? style.btnActive : style.btnFilter}
          onClick={() => handleFiltered('all')}
        >
          {<span>{`Все(${countAllTasks})`}</span>}
        </Button>
        <Button
          classes={filerTask === 'inWork' ? style.btnActive : style.btnFilter}
          onClick={() => handleFiltered('inWork')}
        >
          {<span>{`В работе(${countCompletedTasks})`}</span>}
        </Button>
        <Button
          classes={
            filerTask === 'completed' ? style.btnActive : style.btnFilter
          }
          onClick={() => handleFiltered('completed')}
        >
          {<span>{`Сделано(${countInWorkTasks})`}</span>}
        </Button>
      </div>
      <div>
        <ul className={style.itemsList}>
          {resultTasks.map((task) => {
            return (
              <Task
                key={task.id}
                title={task.title}
                id={task.id}
                isDone={task.isDone}
                created={task.created}
                editTaskTitle={editTaskTitle}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                setError={setError}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
