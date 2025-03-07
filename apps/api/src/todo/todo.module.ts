import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TODO_REPOSITORY } from '../constants/database.constants';
import { Todo } from './todo.entity';

@Module({
  controllers: [TodoController],
  providers: [TodoService, {
    provide: TODO_REPOSITORY,
    useValue: Todo,
  }]
})
export class TodoModule {}
