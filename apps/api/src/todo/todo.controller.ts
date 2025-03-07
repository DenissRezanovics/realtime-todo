import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { TodoDto } from '../dto/todo.dto';

@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  public async getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }

  @Post()
  public async createTodo(@Body() todo: TodoDto): Promise<void> {
    await this.todoService.createTodo(todo);
  }

  @Delete()
  public async deleteTodo(@Param('id') id: string): Promise<void> {
    await this.todoService.deleteTodo(id);
  }
}
