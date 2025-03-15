import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import { TodoModule } from '../core/todo/todo.module';
import { TableActivityModule } from '../core/table-activity/table-activity.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    TodoModule,
    TableActivityModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
