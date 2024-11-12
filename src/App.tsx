import { Outlet } from 'react-router-dom';
import './App.scss';
import { TodoListPage } from './features/todolist/Todolist';


function App() {
  return (
    <div className="App">
      {/* <AuthPage/> */}
      <Outlet />
      <TodoListPage />
    </div>
  );
}

export default App;
