import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GitHubStrategy } from './github.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseAccess } from 'src/databaseAccess/database.module';
import { UsersService } from 'src/Application/user/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Core/Entity/user.entity';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'github' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    TypeOrmModule.forFeature([User]), // Add this line to register UserRepository
  ],
  providers: [AuthService, GitHubStrategy, JwtAuthGuard], // Add UsersService to providers
  exports: [AuthService, JwtAuthGuard],  // Ensure AuthService is exported
  controllers: [AuthController],
})
export class AuthModule {}
