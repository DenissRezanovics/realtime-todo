import { Todo } from '@todo/shared';

export const API_URL = 'http://localhost:5500/api/todo';
export const WS_URL = 'http://localhost:5500';
export const QUERY_KEY = 'todos';
export const emptyTodo: Partial<Todo> = {
  markAsDone: false,
  title: '',
  description: '',
};
