import { DataSource } from 'typeorm';
import { Product } from './Core/Entity/product.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'co-website',
  entities: [Product],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
