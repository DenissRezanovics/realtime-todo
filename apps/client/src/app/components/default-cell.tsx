import * as React from 'react';
import type { CellContext } from '@tanstack/react-table';
import {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import getCaretCoordinates from 'textarea-caret';
import { TableActivityContext } from '../context/table-activity';
import { CursorActivityContext } from '../context/cursor-activity';
import { CursorActivity, TableActivity, Todo } from '@todo/shared';
import { socket } from '../socket';
import { Input } from './ui/input';
import { DataTableMeta } from './data-table';

export const DefaultCell: React.FC<{
  cellContext: CellContext<Todo, unknown>;
}> = ({ cellContext }) => {
  const {
    getValue,
    row: { index, original },
    column: { id },
    table,
  } = cellContext;
  const inputRef = useRef<HTMLInputElement>(null);
  const initialValue = getValue<string>() ?? '';
  const [value, setValue] = useState(initialValue);
  const tableActivity = useContext(TableActivityContext);
  const activeCell = tableActivity.find(
    (cell) => cell.id === original.id && cell.column === id,
  );
  const cursorActivity = useContext(CursorActivityContext);
  const cursor = cursorActivity.find(
    (cursor) =>
      cursor.id === activeCell?.id && cursor.column === activeCell.column,
  );

  useEffect(() => {
    setValue(initialValue);
    if (activeCell) {
      setValue(activeCell.value);
    }
  }, [initialValue, activeCell]);

  const onBlur = () => {
    console.log('column id', id);
    const tableActivity: TableActivity = {
      id: original.id as number,
      column: id,
      value,
      isActive: false,
    };
    socket.emit('todo', tableActivity);

    if (value !== initialValue) {
      (table.options.meta as DataTableMeta).updateRow(index, id, value);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const tableActivity: TableActivity = {
      id: original.id as number,
      column: id,
      value: e.target.value,
      isActive: true,
    };
    socket.emit('todo', tableActivity);
  };

  const onFocus = () => {
    cellContext.row.toggleSelected(true);
    const tableActivity: TableActivity = {
      id: original.id as number,
      column: id,
      value,
      isActive: true,
    };
    socket.emit('todo', tableActivity);
  };

  const handleCursorMove = (event: {
    currentTarget: HTMLInputElement;
  }): void => {
    if (inputRef.current) {
      const coordinates = getCaretCoordinates(
        inputRef.current,
        event?.currentTarget.selectionStart ?? 0,
      );
      const position = {
        x: coordinates.left,
        y: coordinates.top,
      };
      const cursorActivity: CursorActivity = {
        id: original.id as number,
        column: id,
        position,
      };
      socket.emit('cursor', cursorActivity);
    }
  };

  return (
    <>
      <Input
        ref={inputRef}
        disabled={activeCell?.isActive}
        value={activeCell?.isActive ? activeCell.value : value}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={handleCursorMove}
        onClick={handleCursorMove}
      />
      {activeCell?.isActive && (
        <div
          className="absolute w-4 h-4 bg-blue-500 rounded-full opacity-75 transition-all duration-75"
          style={{
            left: cursor?.position.x,
            bottom: cursor?.position.y,
          }}
        />
      )}
    </>
  );
};
