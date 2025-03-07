import {useQuery} from "@tanstack/react-query";
import {DataTable} from "../components/data-table";
import {columns} from "../components/columns";
import { useEffect, useState } from 'react';
import { API_URL } from '../constants';
import { socket } from '../socket';
import { CursorActivity, TableActivity } from '@todo/shared';
import { TableActivityContext } from '../context/table-activity';
import { CursorActivityContext } from '../context/cursor-activity';

const fetchTodos = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export default function Todos() {
    const todoQuery = useQuery({ queryKey: ['todos'], queryFn: fetchTodos})
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [tableActivityEvents, setTableActivityEvents] = useState<TableActivity[]>([]);
    const [cursorActivityEvents, setCursorActivityEvents] = useState<CursorActivity[]>([]);

    useEffect(() => {
        function onConnect() {
            console.log("onConnect");
            setIsConnected(true);
        }

        function onDisconnect() {
            console.log("onDisconnect");
            setIsConnected(false);
        }

        function onTableActivityEvent(tableActivity: TableActivity) {
            setTableActivityEvents(previous => [tableActivity, ...previous]);
        }

        function onCursorEvent(cursor: CursorActivity) {
            // console.log("Active Cursor", cursor);
            setCursorActivityEvents(previous => [cursor, ...previous]);
        }
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('todo', onTableActivityEvent);
        socket.on('cursor', onCursorEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('todo', onTableActivityEvent);
            socket.off('cursor', onCursorEvent);
        };
    }, []);

    if (todoQuery.status === "error") {
        return <h1>Something went wrong :(</h1>
    }

    return (
      <TableActivityContext.Provider value={tableActivityEvents}>
          <CursorActivityContext.Provider value={cursorActivityEvents}>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                {todoQuery.isLoading ? <></> : <DataTable data={todoQuery.data} columns={columns} />}
            </div>
          </CursorActivityContext.Provider>
      </TableActivityContext.Provider>
    );
}
