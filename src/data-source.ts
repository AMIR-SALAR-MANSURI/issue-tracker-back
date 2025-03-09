import { DataSource } from 'typeorm';
import { User } from 'src/Core/Entity/user.entity';
import { Issue } from './Core/Entity/issue.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest',
  entities: [User,Issue],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
