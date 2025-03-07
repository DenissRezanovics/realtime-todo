import { API_URL } from '../constants';

export const fetchTodos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};
