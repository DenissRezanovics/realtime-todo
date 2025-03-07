import { createContext } from 'react';
import { TableActivity } from '@todo/shared';

export const TableActivityContext = createContext<TableActivity[]>([]);
