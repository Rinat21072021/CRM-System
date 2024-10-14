import { filterValueType } from '../App';

const baseUrl = 'https://easydev.club/api/v1/todos';

export const fetchTasks = async (url: string) => {
  try {
    const result = await fetch(`${baseUrl}${url}`);
    const res = result.json();
    const data = await res;
    return data;
  } catch (error) {
    console.log('fetchTasks ', error);
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
    console.log('AddTask ', error);
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
    console.log('editTask ', error);
  }
};

export const fetchRemoveTask = async (id: number) => {
  const requestOptions = {
    method: 'DELETE',
  };
  try {
    const result = await fetch(`${baseUrl}/${id}`, requestOptions);
    const data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('remove ', error);
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
    console.log('changeTaskStatus ', error);
  }
};

export const fetchCountTasks = async (value: filterValueType) => {
  try {
    const result = await fetch(`${baseUrl}?filter=${value}`);
    const data = await result.json();
    return data.info;
  } catch (error) {
    console.log('fetchCountTasks ', error);
  }
};

// export const asffetchFilteredTasks = async (value:filterValueType)=>{
//   try{
//     const result = await fetch(`${baseUrl}?filter=${value}`);
//     const data = await result.json()
//     console.log(data.data)
//     return data
//   } catch (error){
//     console.log('fetchCountTasks ', error)
//   }
// }
