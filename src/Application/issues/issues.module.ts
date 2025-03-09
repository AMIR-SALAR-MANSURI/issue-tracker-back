import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from 'src/Core/Entity/issue.entity';
import { User } from 'src/Core/Entity/user.entity';
import { IssueService } from './isuues.service';
import { IssueController } from 'src/EndPoint/issues/issues.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Issue]),JwtModule.register({}),],
  providers: [IssueService],
  controllers: [IssueController],
})
export class IssueModule {}