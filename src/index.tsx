import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/errorPage/ErrorPage';
import { TodoListPage } from './features/todolist/Todolist';
import { AuthPage } from './pages/AuthPage';
import { CreateAccauntForm } from './features/auth/ui/createAccauntForm/CreateAccauntForm';
import { store } from './app/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Navigate to="404" />,
    children: [
      {
        path: 'login',
        element: <AuthPage />,
      },
      {
        path: 'todolist',
        element: <TodoListPage />,
      },
      {
        path: 'create',
        element: <CreateAccauntForm />,
      },
    ],
  },
  { path: '404', element: <ErrorPage /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
