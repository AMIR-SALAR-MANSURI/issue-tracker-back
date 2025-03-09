import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { GitHubStrategy } from 'src/auth/github.strategy';
import { Issue } from 'src/Core/Entity/issue.entity';
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
        entities: [User,Issue],
        synchronize: true, // Disable in production
        migrationsRun: true, // Run migrations automatically
      }),
    }),
 TypeOrmModule.forFeature([User]), // Add this line
    AuthModule, // Ensure that AuthModule is imported as well

  ],
  providers: [GitHubStrategy],
  

})
export class DatabaseAccess {}
