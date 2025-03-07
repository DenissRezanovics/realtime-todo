import type {Table} from "@tanstack/react-table";
import {PlusCircle, X} from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

import {useMutation, useQueryClient} from "@tanstack/react-query";
import * as React from "react";
import type {Todo} from "~/data/schema";

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}



export function DataTableToolbar<TData>({
                                            table,
                                        }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const queryClient = useQueryClient();

    const addEmptyRow = () => {
        console.log("add empty row");
        queryClient.setQueryData(["todos"], (oldTodos: Todo[]): Todo[] => [
            { title: "", description: "" },
            ...oldTodos,
        ]);
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter tasks..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X />
                    </Button>
                )}
                <Button
                    variant="default"
                    onClick={() => table.options.meta?.addRow()}
                    className="h-8 px-2 lg:px-3"
                >
                    Add
                    <PlusCircle />
                </Button>
            </div>
        </div>
    )
}