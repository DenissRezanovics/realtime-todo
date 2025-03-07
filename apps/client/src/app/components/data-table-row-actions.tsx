import type { CellContext, Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Todo } from '@todo/shared';
import { DataTableMeta } from './data-table';

interface DataTableRowActionsProps {
  cellContext: CellContext<Todo, unknown>;
}

export function DataTableRowActions({
  cellContext,
}: DataTableRowActionsProps) {
  const onDelete = (): void => {
    const {id} = cellContext.row.original;
    const meta = cellContext.table.options.meta as DataTableMeta
    meta.deleteRow(id)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={onDelete}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
