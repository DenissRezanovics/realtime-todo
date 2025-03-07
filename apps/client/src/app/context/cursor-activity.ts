import { CursorActivity } from '@todo/shared';
import { createContext } from 'react';

export const CursorActivityContext = createContext<CursorActivity[]>([]);
