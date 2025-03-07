import {useQuery} from "@tanstack/react-query";
import {DataTable} from "../components/data-table";
import {columns} from "../components/columns";
import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { CursorActivity, Events, TableActivity, Todo } from '@todo/shared';
import { TableActivityContext } from '../context/table-activity';
import { CursorActivityContext } from '../context/cursor-activity';
import { fetchTodos } from '../requests/fetch-todos';
import { emptyTodo, QUERY_KEY } from '../constants';

export default function Todos() {
    const todoQuery = useQuery<Todo[]>({ queryKey: [QUERY_KEY], queryFn: fetchTodos})
    const [tableActivityEvents, setTableActivityEvents] = useState<TableActivity[]>([]);
    const [cursorActivityEvents, setCursorActivityEvents] = useState<CursorActivity[]>([]);

    useEffect(() => {
        function onTableActivityEvent(tableActivity: TableActivity) {
            setTableActivityEvents(previous => [tableActivity, ...previous]);
        }

        function onCursorEvent(cursor: CursorActivity) {
            setCursorActivityEvents(previous => [cursor, ...previous]);
        }
        socket.on(Events.TODO, onTableActivityEvent);
        socket.on(Events.CURSOR, onCursorEvent);

        return () => {
            socket.off(Events.TODO, onTableActivityEvent);
            socket.off(Events.CURSOR, onCursorEvent);
        };
    }, []);

    if (todoQuery.status === "error") {
        return <h1>Something went wrong :(</h1>
    }

    return (
      <TableActivityContext.Provider value={tableActivityEvents}>
          <CursorActivityContext.Provider value={cursorActivityEvents}>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                {todoQuery.isLoading ? <></> : <DataTable data={todoQuery.data?.length ? todoQuery.data : [emptyTodo]} columns={columns} />}
            </div>
          </CursorActivityContext.Provider>
      </TableActivityContext.Provider>
    );
}
