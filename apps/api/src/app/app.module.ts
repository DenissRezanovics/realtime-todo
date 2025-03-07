import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import { TodoModule } from '../todo/todo.module';
import { TableActivityModule } from '../table-activity/table-activity.module';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
