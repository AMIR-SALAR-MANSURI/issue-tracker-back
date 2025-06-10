import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { GitHubStrategy } from 'src/auth/github.strategy';
import { Account } from 'src/Core/Entity/account.entity';
import { Chat } from 'src/Core/Entity/chat.entity';
import { Issue } from 'src/Core/Entity/issue.entity';
import { Message } from 'src/Core/Entity/message.entity';
import { Session } from 'src/Core/Entity/sesssion.entity';
import { User } from 'src/Core/Entity/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost', // or use 'db' if inside docker-compose network
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'pass123',
    //   database: 'postgres',
    //   autoLoadEntities: true,
    //   entities: [User, Issue, Account, Session],

    //   synchronize: true,
    // }),
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
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nest',
        entities: [User, Issue, Account, Session, Chat, Message],
        synchronize: true,
        migrationsRun: false,
        migrations: ['src/migrations/*.ts'],
      }),
    }),
    TypeOrmModule.forFeature([User]), // Add this line
    AuthModule, // Ensure that AuthModule is imported as well
  ],
  providers: [GitHubStrategy],
})
export class DatabaseAccess {}
