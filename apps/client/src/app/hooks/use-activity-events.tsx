import { useEffect, useState } from "react";
import { CursorActivity, Events, TableActivity } from '@todo/shared';
import { socket } from '../socket';

export const useActivityEvents = () => {
  const [tableActivityEvents, setTableActivityEvents] = useState<TableActivity[]>([]);
  const [cursorActivityEvents, setCursorActivityEvents] = useState<CursorActivity[]>([]);

  useEffect(() => {
    function onTableActivityEvent(tableActivity: TableActivity) {
      setTableActivityEvents((previous) => [tableActivity, ...previous]);
    }

    function onCursorEvent(cursor: CursorActivity) {
      setCursorActivityEvents((previous) => [cursor, ...previous]);
    }

    socket.on(Events.TODO, onTableActivityEvent);
    socket.on(Events.CURSOR, onCursorEvent);

    return () => {
      socket.off(Events.TODO, onTableActivityEvent);
      socket.off(Events.CURSOR, onCursorEvent);
    };
  }, [socket]); // Dependency array ensures effect runs when socket changes

  return { tableActivityEvents, cursorActivityEvents };
}
