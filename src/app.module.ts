import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseAccess } from './DataAccess/database.module';
import { IssueModule } from './Application/issues/issues.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './Application/chats/chat.module';
import { MinioModule } from './Application/minio/minio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseAccess,
    MinioModule,
    //  UsersModule,
    IssueModule,
    AuthModule,
    ChatModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
