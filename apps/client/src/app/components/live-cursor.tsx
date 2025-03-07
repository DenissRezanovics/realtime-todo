import { CursorActivityContext } from '../pages/todos.tsx';
import { FC,  useContext } from 'react';
import { TableActivity } from '@/data/tableActivitySchema.ts';

interface LiveCursorProps {
  activeCell: TableActivity
}
export const LiveCursor: FC<LiveCursorProps> = ({ activeCell }) => {
  const cursorActivity = useContext(CursorActivityContext);
  const cursor = cursorActivity.find(cursor => cursor.id === activeCell.id && cursor.column === activeCell.column)

  return cursor && <span
    className="absolute bg-blue-500 w-[2px] h-6 animate-blink"
    style={{
      left: `${cursor.position.x}px`,
      top: `${cursor.position.y}px`,
      transform: "translateY(-50%)",
    }}
    />;
}