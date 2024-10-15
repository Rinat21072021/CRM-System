
import './App.scss';
import { Todolist } from '../components/todolist/Todolist';
import { useTodolist } from './hooks/useTodolist';

function App() {
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
        editTaskTitle={editTaskTitle}
        setFilteredTasks={setFilteredTasks}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
