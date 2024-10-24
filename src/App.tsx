import './App.scss';
import { AuthPage } from './auth/Auth';
import { TodoListPage } from './components/todolist/Todolist';

function App() {
  return (
    <div className="App">
      <AuthPage/>
      {/* <TodoListPage /> */}

    </div>
  );
}

export default App;
