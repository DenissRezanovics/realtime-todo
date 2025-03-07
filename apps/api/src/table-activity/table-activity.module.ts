import { Module } from '@nestjs/common';
import { TableActivityGateway } from './table-activity.gateway';

@Module({
  providers: [TableActivityGateway]
})
export class TableActivityModule {}
