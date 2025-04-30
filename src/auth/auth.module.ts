import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GitHubStrategy } from './github.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseAccess } from 'src/databaseAccess/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Core/Entity/user.entity';
import { JwtAuthGuard } from './auth.guard';
import { Account } from 'src/Core/Entity/account.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'githubaa' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, GitHubStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
