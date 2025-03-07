import { Todo } from '@todo/shared';
import { API_URL } from '../constants';

export const addTodo = async (newTodo: Todo) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });

  return res.json();
};
