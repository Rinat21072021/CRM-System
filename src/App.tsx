
import { useEffect, useState } from 'react';
import './App.scss';
import { Todolist } from './components/todolist/Todolist';

export type filterValueType = 'all' | 'completed' | 'inWork';
export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

const baseUrl = 'https://easydev.club/api/v1/todos';

function App() {
  let [tasks, setTasks] = useState<Todo[]>([]);
  const [filerTask, setFilerTask] = useState<filterValueType>('all');

  useEffect(() => {
    fetch(`${baseUrl}?filter=all`)
      .then((res) => res.json())
      .then((res) => setTasks(res.data));
  }, []);

  const addTask = (title: string) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ title: title, isDone: false }),
    };
    fetch(baseUrl, requestOptions)
      .then((res) => res.json())
      .then((data) => setTasks([data, ...tasks]));
  };

  const editTask = (id: number, title: string) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title }),
    };
    fetch(`${baseUrl}/${id}`, requestOptions).then((res) => res.json());
    setTasks(
      tasks.map((eTask) => (id === eTask.id ? { ...eTask, title } : eTask)),
    );
  };

  const removeTask = (id: number) => {
    const requestOptions = {
      method: 'DELETE',
    };
    fetch(`${baseUrl}/${id}`, requestOptions).then(() =>
      setTasks(tasks.filter((el) => el.id !== id)),
    );
  };

  const changeTask = (id: number, isDone: boolean) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isDone }),
    };
    fetch(`${baseUrl}/${id}`, requestOptions).then((res) => res.json());

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

  const countAllTasks = tasks.length;
  const countCompletedTasks = tasks.filter((fTasks) => !fTasks.isDone).length;
  const countInWorkTasks = tasks.filter((fTasks) => fTasks.isDone).length;

  const resultTasks = getFilteredTasks();

  return (
    <div className="App">
      <Todolist
        countAllTasks={countAllTasks}
        countCompletedTasks={countCompletedTasks}
        countInWorkTasks={countInWorkTasks}
        tasks={resultTasks}
        filerTask={filerTask}
        addTask={addTask}
        removeTask={removeTask}
        editTask={editTask}
        setFilteredTasks={setFilteredTasks}
        changeTask={changeTask}
      />
    </div>
  );
}

export default App;
