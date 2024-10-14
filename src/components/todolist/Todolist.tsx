import { useCallback, useEffect, useState } from 'react';
import { Button } from '../button/Button';
import { InputText } from '../inputText/InputText';
import { filterValueType, Todo } from '../../App';
import style from './TodoStyle.module.scss';
import { Task } from '../task/Task';
import { fetchCountTasks } from '../../api/Api';

export type TodolistType = {
  tasks: Todo[];
  filerTask: filterValueType;
  addedTask: (title: string) => void;
  removeTask: (id: number) => void;
  editTaskTitle: (id: number, title: string) => void;
  changeTaskStatus: (id: number, isDone: boolean) => void;
  setFilteredTasks: (filerTask: filterValueType) => void;
};

export const Todolist = ({
  tasks,
  filerTask,
  addedTask,
  removeTask,
  editTaskTitle,
  changeTaskStatus,
  setFilteredTasks,
}: TodolistType) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const [countAllTasks, setCountAllTasks] = useState(0);
  const [countCompletedTasks, setCountCompletedTasks] = useState(0);
  const [countInWorkTasks, setCountInWorkTasks] = useState(0);

  const countTasks = useCallback(async (value: filterValueType) => {
    const result = await fetchCountTasks(value);
    return result[value];
  },[]
)
  
  useEffect(() => {
    const fetchData = async () => {
      const allTasks = await countTasks('all');
      const completedTasks = await countTasks('completed');
      const inWorkTasks = await countTasks('inWork');

      setCountAllTasks(allTasks);
      setCountCompletedTasks(completedTasks);
      setCountInWorkTasks(inWorkTasks);
    };

    fetchData();
  });
  const validText = text.length > 2 && text.length < 64;

  const handleAddTask = () => {
    if (validText) {
      addedTask(text);
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
          {<span>{`В работе(${countInWorkTasks})`}</span>}
        </Button>
        <Button
          classes={
            filerTask === 'completed' ? style.btnActive : style.btnFilter
          }
          onClick={() => handleFiltered('completed')}
        >
          {<span>{`Сделано(${countCompletedTasks})`}</span>}
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
