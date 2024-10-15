import { ButtonHTMLAttributes, ReactNode } from "react";

export type filterValueType = 'all' | 'completed' | 'inWork';
export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

export type ButtonType = {
  onClick: () => void;
  disabled?: boolean;
  typeClasses?: string
  classes?: string;
  children:ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type InputTextType = {
  text: string;
  setText: (text: string) => void;
  setError: (error: boolean) => void;
};

export type TaskType = {
  title: string;
  id: number;
  isDone: boolean;
  created: string;
  editTaskTitle: (id: number, title: string) => void;
  removeTask: (id: number) => void;
  changeTaskStatus: (id: number, isDone: boolean) => void;
  setError: (error: boolean) => void;
};

export type TodolistType = {
  countAllTasks: number;
  countCompletedTasks: number;
  countInWorkTasks: number;
  tasks: Todo[];
  filerTask: filterValueType;
  addTask: (title: string) => void;
  removeTask: (id: number) => void;
  editTaskTitle: (id: number, title: string) => void;
  changeTaskStatus: (id: number, isDone: boolean) => void;
  setFilteredTasks: (filerTask: filterValueType) => void;
};