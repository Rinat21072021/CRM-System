import { filterValueType } from '../type/type';

const baseUrl = 'https://easydev.club/api/v1/todos';
const currentTasks = '?filter=all'

export const fetchTasks = async () => {
  try {
    const result = await fetch(`${baseUrl}${currentTasks}`);
    const res = result.json();
    const data = await res;
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAddTask = async (title: string) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ title: title, isDone: false }),
  };
  try {
    const result = await fetch(baseUrl, requestOptions);
    const data = await result.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchEditTaskTitle = async (id: number, title: string) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title }),
  };
  try {
    const result = await fetch(`${baseUrl}/${id}`, requestOptions);
    const data = await result.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchRemoveTask = async (id: number) => {
  const requestOptions = {
    method: 'DELETE',
  };
  try {
    const result = await fetch(`${baseUrl}/${id}`, requestOptions);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchChangeTaskStatus = async (id: number, isDone: boolean) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, isDone }),
  };
  try {
    const result = await fetch(`${baseUrl}/${id}`, requestOptions);
    const data = await result.json();
  } catch (error) {
    throw error;
  }
};

export const fetchFilteredTasks = async (value: filterValueType) => {
  try {
    const result = await fetch(`${baseUrl}?filter=${value}`);
    const data = await result.json();

    return data;
  } catch (error) {
    throw error;
  }
};
