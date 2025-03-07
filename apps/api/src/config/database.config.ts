import { registerAs } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Todo } from '../todo/todo.entity';

export default registerAs("database", async (): Promise<Sequelize> => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'todos',
  });
  sequelize.addModels([Todo]);
  await sequelize.sync();
  return sequelize;
})
