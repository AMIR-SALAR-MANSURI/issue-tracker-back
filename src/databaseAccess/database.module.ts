import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Core/Entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'co-website',
        entities: [Product],
        synchronize: true, // Disable in production
        migrationsRun: true, // Run migrations automatically
      }),
    }),


  ],
  

})
export class DatabaseAccess {}
