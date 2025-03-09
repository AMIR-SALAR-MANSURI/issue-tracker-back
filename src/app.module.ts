import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseAccess } from './databaseAccess/database.module';
import { UsersModule } from './Application/user/users.module';
import { IssueModule } from './Application/issues/issues.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
     DatabaseAccess,
    //  UsersModule,
     IssueModule,
     AuthModule,
     
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
