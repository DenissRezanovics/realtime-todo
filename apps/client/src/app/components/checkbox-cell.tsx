import * as React from 'react';
import type { CellContext } from '@tanstack/react-table';
import { Todo } from '@todo/shared';
import { Checkbox } from './ui/checkbox';
import { useEffect, useState } from 'react';
import { DataTableMeta } from './data-table';

export const CheckboxCell: React.FC<{
  cellContext: CellContext<Todo, unknown>;
}> = ({ cellContext }) => {
  const { table, getValue, row, column } = cellContext;
  const initialValue = getValue<boolean>();
  const [checked, setChecked] = useState(initialValue);
  const meta = table.options.meta as DataTableMeta;
  const onCheckedChange = (value: boolean) => {
    setChecked(value)
    console.log("Setting check", row.index, column.id, value);
    row.toggleSelected();
    meta.updateRow(row.index, column.id, value);
  }

  useEffect(() => {
    setChecked(initialValue);
  }, [initialValue]);

  return <Checkbox
    checked={checked}
    onCheckedChange={onCheckedChange}
    aria-label="Select row"
    className="translate-y-[2px]"
  />
};
