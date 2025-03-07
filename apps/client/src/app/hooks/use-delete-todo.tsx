import { API_URL, QUERY_KEY } from '../constants';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { Todo } from '@todo/shared';

export const deleteTodo = async (id: number) => {
  const params = new URLSearchParams({ id: String(id) }).toString();
  const res = await fetch(API_URL.concat("?", params), {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useDeleteTodo = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id: number) => {
      // Optimistic Update: Update cache before server response
      queryClient.setQueryData([QUERY_KEY], (oldTodos: Todo[] = []) => oldTodos.filter((t) => t.id !== id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }); // Refetch data
    },
  });
};
