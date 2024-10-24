export type FilterValue = 'all' | 'completed' | 'inWork';
export type VariantIconButton = 'save' | 'cancel' | 'edit' | 'remove';

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

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}
