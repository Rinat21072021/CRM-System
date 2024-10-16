import { useEffect, useState } from 'react';
import { filterValueType, Todo } from '../../../type/type';
import {
  fetchAddTask,
  fetchChangeTaskStatus,
  fetchFilteredTasks,
  fetchEditTaskTitle,
  fetchRemoveTask,
  fetchTasks,
} from '../../../api/api';

const baseUrl = 'https://easydev.club/api/v1/todos';

export const useTodolist = () => {
  let [tasks, setTasks] = useState<Todo[]>([]);
  const [filerTask, setFilerTask] = useState<filterValueType>('all');

  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const [countAllTasks, setCountAllTasks] = useState(0);
  const [countCompletedTasks, setCountCompletedTasks] = useState(0);
  const [countInWorkTasks, setCountInWorkTasks] = useState(0);

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

      setCountAllTasks(countTasks.all);
      setCountCompletedTasks(countTasks.completed);
      setCountInWorkTasks(countTasks.inWork);
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
  return {
    text,
    setText,
    error,
    setError,
    validText,
    filerTask,
    addTask,
    editTaskTitle,
    removeTask,
    changeTaskStatus,
    setFilteredTasks,
    filteredTasks,
    countAllTasks,
    countCompletedTasks,
    countInWorkTasks,
  };
};
