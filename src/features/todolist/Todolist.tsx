import { useEffect, useState } from 'react';

import style from './TodoStyle.module.scss';
import { AddTask } from '../addTask/AddTask';
import { Task } from '../task/Task';
import { FilterValue, Todo } from '../../common/type/type';
import { TodoFilters } from '../todoFilters/TodoFilters';
import {
  useAddTaskMutation,
  useEditTaskTitleMutation,
  useGetFilteredTasksQuery,
  useToggleTaskStatusMutation,
} from '../../api/api';

export const TodoListPage = () => {

  const [filterTask, setFilerTask] = useState<FilterValue>('all');
  // const [countTasks, setCountTasks] = useState({});

const {data: todoList, isLoading} = useGetFilteredTasksQuery(filterTask)
const [addTask] = useAddTaskMutation()
const [editTaskTitle] = useEditTaskTitleMutation()
const [toggleTaskStatus] = useToggleTaskStatusMutation()

const countTasks = todoList?.info

  const editTitleHeading = async (id: number, title: string) => {
    try {
      await editTaskTitle({id, title});
    } catch (error) {
      throw error;
    }
  };

  const changeTaskStatus = async (id: number, isDone: boolean) => {
    try {
       await toggleTaskStatus({id, isDone});
    } catch (error) {
      throw error;
    }
  };

  const handleChangeFilter = (filter: FilterValue) => {
    setFilerTask(filter);
  };
  if (isLoading) return <div>Загрузка</div>
  return (
    <div className={style.todoList}>
      <div className={style.addInput}>
        <AddTask onClick={(title: string) => addTask({title, isDone:false})} />
      </div>
      <TodoFilters
        countTasks={countTasks}
        filerTask={filterTask}
        filtered={(filter) => handleChangeFilter(filter)}
      />
      <div>
        <ul className={style.itemsList}>
          {todoList && todoList.data.map((task) => {
            return (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                isDone={task.isDone}
                created={task.created}
                editTitleHeading={editTitleHeading}
                changeTaskStatus={changeTaskStatus}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
