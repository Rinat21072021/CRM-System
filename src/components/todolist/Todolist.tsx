import { useState } from 'react';
import { Button } from '../button/Button';
import { InputText } from '../inputText/InputText';
import style from './TodoStyle.module.scss';

import { Task } from '../task/Task';
import { filterValueType } from '../../type/type';
import { useTodolist } from './hooks/useTodolist';
import { FilterBtn } from '../filterBtn/FilterBtn';

export const Todolist = () => {
  const {
    text,
    setText,
    error,
    setError,
    validText,
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

  const handleAddTask = () => {
    if (validText) {
      addTask(text);
      setText('');
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleFiltered = (filter: filterValueType) => {
    setFilteredTasks(filter);
  };

  return (
    <div className={style.todoList}>
      <div className={style.addInput}>
        <InputText
          setText={setText}
          setError={setError}
          text={text}
          onClick={() => handleAddTask()}
        />
        <div className={error ? style.error : style.notError}>
          Text must be more than 2 and less than 62 characters
        </div>
      </div>
      <FilterBtn
        countAllTasks={countAllTasks}
        countCompletedTasks={countCompletedTasks}
        countInWorkTasks={countInWorkTasks}
        filerTask={filerTask}
        filtered={(filter) => handleFiltered(filter)}
      />
      <div>
        <ul className={style.itemsList}>
          {resultTasks.map((task) => {
            return (
              <Task
                key={task.id}
                title={task.title}
                id={task.id}
                isDone={task.isDone}
                created={task.created}
                editTaskTitle={editTaskTitle}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                setError={setError}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
