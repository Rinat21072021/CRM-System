import { useEffect, useState } from 'react';

import style from './TodoStyle.module.scss';
import { InputText } from '../inputText/InputText';
import { Task } from '../task/Task';
import { FilterValueType, Todo } from '../../type/type';
import { FilterBtn } from '../filterBtn/FilterBtn';
import {
  fetchAddTask,
  fetchChangeTaskStatus,
  fetchEditTaskTitle,
  fetchFilteredTasks,
  fetchRemoveTask,
  fetchTasks,
} from '../../api/api';

export const Todolist = () => {
  let [tasks, setTasks] = useState<Todo[]>([]);
  const [filterTask, setFilerTask] = useState<FilterValueType>('all');
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [countTasks, setCountTasks] = useState({});

  const validText = text.length > 2 && text.length < 64;

  const filteredTasks = async () => {
    const getTasks = await fetchFilteredTasks(filterTask);
    const tasks = await getTasks.data;
    setTasks(tasks);
  };

  useEffect(() => {
    const fetchData = async ()=>{
      const getTasks = await fetchTasks();
      const countTasks = await getTasks.info;
      const tasks = await getTasks.data;
      setTasks(tasks);
      setCountTasks(countTasks);
    }
    fetchData()
  }, []);

  const addTask = async (title: string) => {
    const newTask = await fetchAddTask(title);
    filteredTasks()
  };

  const editTaskTitle = async (id: number, title: string) => {
    const resultEditTask = await fetchEditTaskTitle(id, title);
    const getTasks = await fetchFilteredTasks(filterTask);
    const countTasks = await getTasks.info;
    const tasks = await getTasks.data;
    setCountTasks(countTasks);
    setTasks(
      tasks.map((eTask: Todo) =>
        id === eTask.id ? { ...eTask, title } : eTask,
      ),
    );
  };

  const removeTask = async (id: number) => {
    const result = await fetchRemoveTask(id);
    filteredTasks()
  };

  const changeTaskStatus = async (id: number, isDone: boolean) => {
    const result = await fetchChangeTaskStatus(id, isDone);
    const getTasks = await fetchFilteredTasks(filterTask);
    const countTasks = await getTasks.info;
    setCountTasks(countTasks);
    const tasks = await getTasks.data;
    setTasks(tasks.map((t: Todo) => (t.id === id ? { ...t, isDone } : t)));
  };

  const getFilteredTasks = async () => {
    const result = await fetchFilteredTasks(filterTask);
    const countTasks = await result.info;
    let filteredTasks = await result.data;
    setTasks(filteredTasks);
    setCountTasks(countTasks);
  };

  useEffect(() => {
    getFilteredTasks();
  }, [filterTask]);

  const handleAddTask = () => {
    if (validText) {
      addTask(text);
      setText('');
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleFiltered = (filter: FilterValueType) => {
    setFilerTask(filter);
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
        filerTask={filterTask}
        filtered={(filter) => handleFiltered(filter)}
      />
      <div>
        <ul className={style.itemsList}>
          {tasks.map((task) => {
            return (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
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
