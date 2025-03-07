import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { DefaultCell } from './default-cell';
import { Todo } from '@todo/shared';
import { CheckboxCell } from './checkbox-cell';

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: (cellContext) => <DefaultCell cellContext={cellContext} />,
    enableSorting: false,
    enableHiding: false,
    size: 300,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: (cellContext) => <DefaultCell cellContext={cellContext} />,
    size: 1500,
  },
  {
    accessorKey: 'markAsDone',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Done" />,
    cell: (cellContext) => <CheckboxCell cellContext={cellContext} />,
    size: 10,
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: (cellContext) => <DataTableRowActions cellContext={cellContext} />,
    size: 10,
  },
];
