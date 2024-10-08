import { useState } from 'react';
import { Button } from '../button/Button';
import { InputText } from '../inputText/InputText';
import { filterValueType, Todo } from '../../App';
import style from './TodoStyle.module.scss';
import { Icons } from '../../img/Icons';

export type TodolistType = {
  countAllTasks: number;
  countCompletedTasks: number;
  countInWorkTasks: number;
  tasks: Todo[];
  filerTask: filterValueType;
  addTask: (title: string) => void;
  removeTask: (id: number) => void;
  editTask: (id:number, title:string)=> void
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

  const handleChangeTask = (taskId: number, isDone: boolean) => {
    changeTask(taskId, isDone);
  };
const hendleEditTask = (taskId: number, title: string)=>{
  editTask(taskId, title)
}
  const handleFiltered = (filter: filterValueType) => {
    setFilteredTasks(filter);
  };

  const task = tasks.map((t) => {
    return (
      <li key={t.id} className={style.itemTask}>
        <div className={style.wrapperItemsText}>
          <input
            type="checkbox"
            checked={t.isDone}
            onChange={(e) => handleChangeTask(t.id, e.currentTarget.checked)}
          />
          <span className={t.isDone ? style.taskDone : style.task}>
            {t.title}
          </span>
        </div>
        <div className={style.wrapperItemsBtn}>
          <Button title={'edit'} onClick={() => {}}>
            <Icons name="EditIcon" color="black" />
          </Button>
          <Button
            title={'remove'}
            onClick={() => {
              removeTask(t.id);
            }}
          >
            <Icons name="RemoveIcon" color="black" />
          </Button>
        </div>
      </li>
    );
  });

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
        <ul className={style.itemsList}>{task}</ul>
      </div>
    </div>
  );
};
