import { createZodDto } from 'nestjs-zod';
import { tableActivitySchema } from '@todo/shared';

export class TableActivityDto extends createZodDto(tableActivitySchema){}
