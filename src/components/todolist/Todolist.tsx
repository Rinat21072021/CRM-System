import { useState } from 'react';
import { Button } from '../button/Button';
import { InputText } from '../inputText/InputText';
import { filterValueType, Todo } from '../../App';
import style from './TodoStyle.module.scss';
import { Task } from '../task/Task';

export type TodolistType = {
  countAllTasks: number;
  countCompletedTasks: number;
  countInWorkTasks: number;
  tasks: Todo[];
  filerTask: filterValueType;
  addTask: (title: string) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
  changeTask: (id: number, isDone: boolean) => void;
  setFilteredTasks: (filerTask: filterValueType) => void;
};

export const Todolist = ({
  countAllTasks,
  countCompletedTasks,
  countInWorkTasks,
  tasks,
  filerTask,
  addTask,
  removeTask,
  editTask,
  changeTask,
  setFilteredTasks,
}: TodolistType) => {
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
          {tasks.map((task) => {
            return (
              <Task
                key={task.id}
                title={task.title}
                id={task.id}
                isDone={task.isDone}
                created={task.created}
                editTask={editTask}
                removeTask={removeTask}
                changeTask={changeTask}
                setError={setError}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
