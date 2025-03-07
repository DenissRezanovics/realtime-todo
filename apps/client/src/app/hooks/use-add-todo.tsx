import { QueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants';
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


export const useAddTodo = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      // Optimistic Update: Update cache before server response
      queryClient.setQueryData([QUERY_KEY], (oldTodos: Todo[] = []) => [
        ...oldTodos,
        newTodo,
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }); // Refetch data
    },
  });
}
