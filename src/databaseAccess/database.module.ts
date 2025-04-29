import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { GitHubStrategy } from 'src/auth/github.strategy';
import { Account } from 'src/Core/Entity/account.entity';
import { Issue } from 'src/Core/Entity/issue.entity';
import { Session } from 'src/Core/Entity/sesssion.entity';
import { User } from 'src/Core/Entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nest',
        entities: [User, Issue, Account, Session],
        synchronize: true,
        migrationsRun: true,
      }),
    }),
    TypeOrmModule.forFeature([User]), // Add this line
    AuthModule, // Ensure that AuthModule is imported as well
  ],
  providers: [GitHubStrategy],
})
export class DatabaseAccess {}
