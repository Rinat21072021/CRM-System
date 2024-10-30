import { Outlet } from 'react-router-dom';
import './App.scss';


function App() {
  return (
    <div className="App">
      {/* <AuthPage/> */}
      <Outlet />
      {/* <TodoListPage /> */}
    </div>
  );
}

export default App;
