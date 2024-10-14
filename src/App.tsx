import { useEffect, useState } from 'react';
import './App.scss';
import { Todolist } from './components/todolist/Todolist';
import {
  fetchAddTask,
  fetchChangeTaskStatus,
  fetchCountTasks,
  fetchEditTaskTitle,
  fetchRemoveTask,
  fetchTasks,
} from './api/Api';

export type filterValueType = 'all' | 'completed' | 'inWork';
export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

function App() {
  let [tasks, setTasks] = useState<Todo[]>([]);
  const [filerTask, setFilerTask] = useState<filterValueType>('all');

  const getTasks = async () => {
    const result = await fetchTasks(`?filter=all`);
    const data = await result.data;
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addedTask = async (title: string) => {
    const data = await fetchAddTask(title);
    setTasks([data, ...tasks]);
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

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    if (filerTask === 'completed') {
      filteredTasks = tasks.filter((fTasks) => fTasks.isDone);
    } else if (filerTask === 'inWork') {
      filteredTasks = tasks.filter((fTask) => !fTask.isDone);
    }

    return filteredTasks;
  };

  const resultTasks = getFilteredTasks();

  return (
    <div className="App">
      <Todolist
        tasks={resultTasks}
        filerTask={filerTask}
        addedTask={addedTask}
        removeTask={removeTask}
        editTaskTitle={editTaskTitle}
        setFilteredTasks={setFilteredTasks}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
