import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Core/Entity/product.entity';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   useFactory: async () => ({
    //     type: 'mysql',
    //     host: process.env.DB_HOST || 'localhost',
    //     port: 3306,
    //     username: process.env.DB_USER || 'root',
    //     password: process.env.DB_PASS || '',
    //     database: process.env.DB_NAME || 'co-website',
    //     entities: [Product],
    //     synchronize: true, // Disable in production
    //     migrationsRun: true, // Run migrations automatically
    //   }),
    // }),

       TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host:'localhost',
        port: 3306,
        username: 'root',
        password:  '',
        database: 'co-website',
        entities: [Product],
        synchronize: true, // Disable in production
        migrationsRun: true, // Run migrations automatically
      }),
    }),


  ],
  

})
export class DatabaseAccess {}
