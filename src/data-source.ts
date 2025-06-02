import { DataSource } from 'typeorm';
import { User } from 'src/Core/Entity/user.entity';
import { Issue } from './Core/Entity/issue.entity';
import { Session } from 'inspector/promises';
import { Account } from './Core/Entity/account.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // to load from .env

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
