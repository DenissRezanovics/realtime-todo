import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Todos from './pages/todos';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

export default App;
