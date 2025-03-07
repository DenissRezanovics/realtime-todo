import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import { TableActivityContext } from '../context/table-activity';
import { CursorActivityContext } from '../context/cursor-activity';
import { emptyTodo } from '../constants';
import { useActivityEvents } from '../hooks/use-activity-events';
import { useGetTodoQuery } from '../hooks/use-get-todo';

export default function Todos() {
  const todoQuery = useGetTodoQuery();
  const { tableActivityEvents, cursorActivityEvents } = useActivityEvents();

  if (todoQuery.status === 'error') {
    return <h1>Something went wrong :(</h1>;
  }

  return (
    <TableActivityContext.Provider value={tableActivityEvents}>
      <CursorActivityContext.Provider value={cursorActivityEvents}>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          {todoQuery.isLoading ? (
            <>Loading...</>
          ) : (
            <DataTable
              data={todoQuery.data?.length ? todoQuery.data : [emptyTodo]}
              columns={columns}
            />
          )}
        </div>
      </CursorActivityContext.Provider>
    </TableActivityContext.Provider>
  );
}
