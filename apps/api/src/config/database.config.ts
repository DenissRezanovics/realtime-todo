import { registerAs } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Todo } from '../todo/todo.entity';

export default registerAs('database', async (): Promise<Sequelize> => {
  const { DATABASE_URL } = process.env;
  console.log('Creating database', { DATABASE_URL });
  const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
  });
  sequelize.addModels([Todo]);
  await sequelize.sync();
  return sequelize;
});
