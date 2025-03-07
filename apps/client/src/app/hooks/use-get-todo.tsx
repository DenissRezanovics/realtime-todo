import { useQuery } from '@tanstack/react-query';
import { Todo } from '@todo/shared';
import { QUERY_KEY } from '../constants';
import { API_URL } from '../constants';

const fetchTodos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const useGetTodoQuery = () => {
  return useQuery<Todo[]>({
    queryKey: [QUERY_KEY],
    queryFn: fetchTodos,
  });
}
