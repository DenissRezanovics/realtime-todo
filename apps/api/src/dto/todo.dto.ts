import { createZodDto } from 'nestjs-zod';
import { todoSchema } from '@todo/shared';

export class TodoDto extends createZodDto(todoSchema) {}
