import { useEffect, useState } from 'react';

import style from './TodoStyle.module.scss';
import { InputText } from '../inputText/InputText';
import { Task } from '../task/Task';
import { FilterValueType, Todo } from '../../type/type';
import { FilterBtn } from '../filterBtn/FilterBtn';
import {
  fetchAddTask,
  fetchChangeTaskStatus,
  fetchEditTaskTitle,
  fetchFilteredTasks,
  fetchRemoveTask,
} from '../../api/api';

export const Todolist = () => {
  let [tasks, setTasks] = useState<Todo[]>([]);
  const [filterTask, setFilerTask] = useState<FilterValueType>('all');
  const [countTasks, setCountTasks] = useState({});

  const filteredTasks = async () => {
    const getTasks = await fetchFilteredTasks(filterTask);
    const tasks = getTasks.data;
    const countTasks = getTasks.info;
    setCountTasks(countTasks);
    setTasks(tasks);
  };

  useEffect(() => {
    filteredTasks();
  }, []);

  const addTask = async (title: string) => {
    const newTask = await fetchAddTask(title);
    filteredTasks();
  };

  const editTaskTitle = async (id: number, title: string) => {
    const resultEditTask = await fetchEditTaskTitle(id, title);
    filteredTasks();
  };

  const removeTask = async (id: number) => {
    const result = await fetchRemoveTask(id);
    filteredTasks();
  };

  const changeTaskStatus = async (id: number, isDone: boolean) => {
    const result = await fetchChangeTaskStatus(id, isDone);
    filteredTasks();
  };

  useEffect(() => {
    filteredTasks();
  }, [filterTask]);

  const handleFiltered = (filter: FilterValueType) => {
    setFilerTask(filter);
  };

  return (
    <div className={style.todoList}>
      <div className={style.addInput}>
        <InputText
          onClick={(title:string) => addTask(title)}
        />
       
      </div>
      <FilterBtn
        countTasks={countTasks}
        filerTask={filterTask}
        filtered={(filter) => handleFiltered(filter)}
      />
      <div>
        <ul className={style.itemsList}>
          {tasks.map((task) => {
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
