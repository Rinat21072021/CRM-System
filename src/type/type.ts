export type FilterValueType = 'all' | 'completed' | 'inWork';

export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

export type ResponseDataType = {
  data: Todo[];
  info: { all: number; completed: number; inWork: number };
  meta: { totalAmount: number };
};
