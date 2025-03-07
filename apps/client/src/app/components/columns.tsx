import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Checkbox } from './ui/checkbox';
import { DefaultCell } from './default-cell';
import { Todo } from '@todo/shared';

export const columns: ColumnDef<Todo>[] = [
  {
    id: 'taskDone',
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(Boolean(value))}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 10,
  },
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
    id: 'actions',
    cell: (cellContext) => <DataTableRowActions cellContext={cellContext} />,
    size: 10,
  },
];
