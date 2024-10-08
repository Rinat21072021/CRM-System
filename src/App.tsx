import { useState } from 'react';
import './App.scss';
import { Todolist } from './components/todolist/Todolist';

export type filterValueType = 'all' | 'completed' | 'inWork';
export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

const initTodo: Todo[] = [
  { id: 1, title: 'milk', created: 'created', isDone: false },
  { id: 2, title: 'beer', created: 'created', isDone: false },
  { id: 3, title: 'apple', created: 'created', isDone: false },
  { id: 4, title: 'fish', created: 'created', isDone: true },
];

function App() {
  let [tasks, setTasks] = useState<Todo[]>(initTodo);
  const [filerTask, setFilerTask] = useState<filterValueType>('all');

  const addTask = (title: string) => {
    const newTask: Todo = {
      id: 5,
      title: title,
      created: 'sdsd',
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id:number, title:string)=>{
     setTasks(tasks.map((eTask)=> id === eTask.id ? {...eTask, title}: eTask))
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter((delTask) => delTask.id !== id));
  };

  const changeTask = (id: number, isDone: boolean) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, isDone } : t)));
  };

  const setFilteredTasks = (filerTask: filterValueType) => {
    setFilerTask(filerTask);
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
