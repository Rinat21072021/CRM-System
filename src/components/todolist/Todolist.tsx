import { useEffect, useState } from 'react';

import style from './TodoStyle.module.scss';
import { AddTask } from '../addTask/AddTask';
import { Task } from '../task/Task';
import { FilterValue, Todo } from '../../type/type';
import { TodoFilters } from '../todoFilters/TodoFilters';
import {
  fetchAddTask,
  fetchChangeTaskStatus,
  fetchEditTaskTitle,
  fetchFilteredTasks,
  fetchRemoveTask,
} from '../../api/api';

export const TodoListPage = () => {
  let [todoList, setTodoList] = useState<Todo[]>([]);
  const [filterTask, setFilerTask] = useState<FilterValue>('all');
  const [countTasks, setCountTasks] = useState({});

  const getPageData = async () => {
    try {
      const getTasks = await fetchFilteredTasks(filterTask);
      const tasks = getTasks.data;
      const countTasks = getTasks.info;

      if (countTasks !== undefined) {
        setCountTasks(countTasks);
      }
      setTodoList(tasks);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getPageData();
  }, []);

  const addTask = async (title: string) => {
    try {
      const newTask = await fetchAddTask(title);
      await getPageData();
    } catch (error) {
      throw error;
    }
  };

  const editTaskTitle = async (id: number, title: string) => {
    try {
      const resultEditTask = await fetchEditTaskTitle(id, title);
      await getPageData();
    } catch (error) {
      throw error;
    }
  };

  const removeTask = async (id: number) => {
    try {
      const result = await fetchRemoveTask(id);
      await getPageData();
    } catch (error) {
      throw error;
    }
  };

  const changeTaskStatus = async (id: number, isDone: boolean) => {
    try {
      const result = await fetchChangeTaskStatus(id, isDone);
      await getPageData();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getPageData();
  }, [filterTask]);

  const handleChangeFilter = (filter: FilterValue) => {
    setFilerTask(filter);
  };

  return (
    <div className={style.todoList}>
      <div className={style.addInput}>
        <AddTask onClick={(title: string) => addTask(title)} />
      </div>
      <TodoFilters
        countTasks={countTasks}
        filerTask={filterTask}
        filtered={(filter) => handleChangeFilter(filter)}
      />
      <div>
        <ul className={style.itemsList}>
          {todoList.map((task) => {
            return (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                isDone={task.isDone}
                created={task.created}
                editTaskTitle={editTaskTitle}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
