import { createZodDto } from 'nestjs-zod';
import { cursorActivitySchema } from '@todo/shared';

export class CursorActivityDto extends createZodDto(cursorActivitySchema) {}
