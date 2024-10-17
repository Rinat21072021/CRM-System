import { useEffect, useState } from 'react';
import { InputText } from '../inputText/InputText';
import style from './TodoStyle.module.scss';

import { Task } from '../task/Task';
import { filterValueType, Todo } from '../../type/type';
import { FilterBtn } from '../filterBtn/FilterBtn';
import { fetchAddTask, fetchChangeTaskStatus, fetchEditTaskTitle, fetchFilteredTasks, fetchRemoveTask, fetchTasks } from '../../api/api';

export const Todolist = () => {
  let [tasks, setTasks] = useState<Todo[]>([]);
  const [filerTask, setFilerTask] = useState<filterValueType>('all');
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [countTasks, setCountTasks] = useState({});

  const validText = text.length > 2 && text.length < 64;

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTasks('?filter=all');
      const tasks = await result.data;
      setTasks(tasks);
    };
    fetchData();
  }, []);

  const addTask = async (title: string) => {
    const task = await fetchAddTask(title);

    setTasks([task, ...tasks]);
  };

  const editTaskTitle = async (id: number, title: string) => {
    const result = await fetchEditTaskTitle(id, title);
    setTasks(
      tasks.map((eTask) => (id === eTask.id ? { ...eTask, title } : eTask)),
    );
  };

  const removeTask = async (id: number) => {
    const result = await fetchRemoveTask(id);
    setTasks(tasks.filter((el) => el.id !== id));
  };

  const changeTaskStatus = async (id: number, isDone: boolean) => {
    const result = await fetchChangeTaskStatus(id, isDone);
    setTasks(tasks.map((t) => (t.id === id ? { ...t, isDone } : t)));
  };

  const setFilteredTasks = (filterTask: filterValueType) => {
    setFilerTask(filterTask);
  };
  let filteredTasks = tasks;
  const getFilteredTasks = async () => {
    const fetchData = async () => {
      const result = await fetchFilteredTasks(filerTask);
      const countTasks = await result.info;
      const filteredTasks = await result.data;
      setCountTasks(countTasks);
    
      return filteredTasks;
    };
     fetchData();

    if (filerTask === 'completed') {
      filteredTasks = tasks.filter((fTasks) => fTasks.isDone);
    } else if (filerTask === 'inWork') {
      filteredTasks = tasks.filter((fTask) => !fTask.isDone);
    }
  };

  const resultTasks = getFilteredTasks();
  
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
        <InputText
          setText={setText}
          setError={setError}
          text={text}
          onClick={() => handleAddTask()}
        />
        <div className={error ? style.error : style.notError}>
          Text must be more than 2 and less than 62 characters
        </div>
      </div>
      <FilterBtn
        countTasks={countTasks}
        filerTask={filerTask}
        filtered={(filter) => handleFiltered(filter)}
      />
      <div>
        <ul className={style.itemsList}>
          {filteredTasks.map((task) => {
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
