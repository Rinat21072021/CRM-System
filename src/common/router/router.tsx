import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../../App';
import { CreateAccauntForm } from '../../features/auth/ui/createAccauntForm/CreateAccauntForm';
import { TodoListPage } from '../../features/todolist/Todolist';
import { AuthPage } from '../../pages/AuthPage';
import ErrorPage from '../errorPage/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
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
  // { path: '404', element: <ErrorPage /> },
]);
