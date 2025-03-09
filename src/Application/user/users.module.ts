import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from 'src/Core/Entity/user.entity';
import { UsersController } from 'src/EndPoint/users/users.controller';
import { GitHubStrategy } from 'src/auth/github.strategy';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [AuthService,GitHubStrategy,UsersService],
})
export class UsersModule {}