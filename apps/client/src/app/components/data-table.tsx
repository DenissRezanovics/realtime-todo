import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
import {DataTableToolbar} from "./data-table-toolbar";
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '@todo/shared';
import { addTodo } from '../requests/add-todo';
import { emptyTodo, QUERY_KEY } from '../constants';

interface DataTableProps {
    columns: ColumnDef<Todo>[]
    data: Todo[]
}

export const DataTable: FC<DataTableProps> = ({
                                             columns,
                                             data: defaultData,
                                         }) => {
    const [data, setData] = useState(() => [...defaultData]);
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])
    const queryClient = useQueryClient();
    const addTodoMutation = useMutation({
        mutationFn: addTodo,
        onMutate: async (newTodo) => {
            // Optimistic Update: Update cache before server response
            queryClient.setQueryData([QUERY_KEY], (oldTodos: Todo[] = []) => [...oldTodos, newTodo]);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY}); // Refetch data
        },
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        meta: {
            updateRow: (rowIndex: number, columnId: string, value: string) => {
                setData((old) =>
                  old.map((row, index) => {
                      if (index === rowIndex) {
                          return {
                              ...old[rowIndex],
                              [columnId]: value,
                          };
                      }
                      return row;
                  })
                );
            },
            addRow: () => {
                setData((oldTodo) => [...oldTodo, emptyTodo]);
            },
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onStateChange: () => {
            const [selectedRowIndex] = Object.keys(rowSelection);
            if (selectedRowIndex) {
                const todo = table.getRow(String(selectedRowIndex))?.original;
                addTodoMutation.mutate(todo)
            }
            setRowSelection({})
        }
    })

    return (
        <div className="space-y-4">
            <DataTableToolbar table={table} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} width={cell.column.getSize()}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
