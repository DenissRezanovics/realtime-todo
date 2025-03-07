import { Inject, Injectable, Logger } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TODO_REPOSITORY } from '../constants/database.constants';
import { TodoDto } from '../dto/todo.dto';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    @Inject(TODO_REPOSITORY)
    private todoRepository: typeof Todo,
  ) {}

  public async getTodos() {
    return this.todoRepository.findAll();
  }

  public async createTodo(todoDto: TodoDto) {
    this.logger.log('Creating todo', { todoDto });
    // @ts-ignore
    await this.todoRepository.upsert(todoDto);
  }

  public async deleteTodo(id: string) {
    this.logger.log('Deleting todo', { id });
    await this.todoRepository.destroy({
      where: { id },
    });
  }
}
