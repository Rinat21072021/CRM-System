import axios from 'axios';
import { FilterValue, MetaResponse, ResponseDataType, Todo, TodoInfo } from '../common/type/type';
import { instance } from '../common/instance/instance';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InvalidatedProjectKind } from 'typescript';

export const todolistsApi = createApi({
  reducerPath: 'todolistsApi',
  tagTypes: ['Todolist'],
  baseQuery: fetchBaseQuery({
  baseUrl: 'https://easydev.club/api/v1/',
    // prepareHeaders: headers => {
    //   headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`)
    //   headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
    // },
  }),
  endpoints: (build) => {
    return {
      getFilteredTasks: build.query<MetaResponse<Todo, TodoInfo>, any>({
        query: (value) => {
          return {
            url: `todos?filter=${value}`,
            method: 'GET',
          };
        },
        providesTags: ['Todolist'],
      }),

      addTask: build.mutation<ResponseDataType, { title: string; isDone: boolean }>({
        query: ({ title, isDone }) => {
          return {
            url: 'todos',
            method: 'POST',
            body: { title, isDone },
          };
        },
        invalidatesTags: ['Todolist'],
      }),
      removeTask: build.mutation<void, { id: number }>({
        query: ({ id }) => {
          return {
            url: `todos/${id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Todolist'],
      }),
      editTaskTitle: build.mutation<MetaResponse<Todo, TodoInfo>, { id: number; title: string }>({
        query: ({ id, title }) => {
          return {
            url: `todos/${id}`,
            method: 'PUT',
            body: { title },
          };
        },
        invalidatesTags: ['Todolist'],
      }),
      toggleTaskStatus: build.mutation<MetaResponse<Todo, TodoInfo>, { id: number; isDone: boolean }>({
        query: ({ id, isDone }) => {
          return {
            url: `todos/${id}`,
            method: 'PUT',
            body: { isDone },
          };
        },
        invalidatesTags: ['Todolist'],
      }),
    };
  },
});

export const {
  useGetFilteredTasksQuery,
  useAddTaskMutation,
  useRemoveTaskMutation,
  useEditTaskTitleMutation,
  useToggleTaskStatusMutation,
} = todolistsApi;

// export const fetchAddTask = async (
//   title: string,
// ): Promise<ResponseDataType> => {
//   try {
//     const result = await instance.post<ResponseDataType>('todos', {
//       title,
//       isDone: false,
//     });
//     const data = result.data;
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
//
// export const fetchEditTaskTitle = async (id: number, title: string) => {
//   try {
//     const result = await instance.put<MetaResponse<Todo, TodoInfo>>(
//       `todos/${id}`,
//       { title },
//     );
//     const data = result.data;
//     console.log(data);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
//
// export const fetchRemoveTask = async (id: number) => {
//   try {
//     const result = await instance.delete(`todos/${id}`);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };
//
// export const fetchChangeTaskStatus = async (id: number, isDone: boolean) => {
//   try {
//     const result = await instance.put<MetaResponse<Todo, TodoInfo>>(
//       `todos/${id}`,
//       { isDone },
//     );
//     const data = result.data;
//   } catch (error) {
//     throw error;
//   }
// };
// сдклал
// export const fetchFilteredTasks = async (value: FilterValue) => {
//   try {
//     const result = await instance.get<MetaResponse<Todo, TodoInfo>>(
//       `todos?filter=${value}`,
//     );
//     const data = result.data;
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
