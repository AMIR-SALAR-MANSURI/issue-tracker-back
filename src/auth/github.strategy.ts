import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from 'src/Core/Entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    console.log('CLIENT_ID:', configService.get<string>('GITHUB_CLIENT_ID')); // Debugging
    console.log(
      'CLIENT_SECRET:',
      configService.get<string>('GITHUB_CLIENT_SECRET'),
    );
    super({
      clientID: configService.get<any>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<any>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // Create a user object from the GitHub profile
    const user = {
      githubId: profile.id,
      username: profile.username,
      email: profile.emails?.[0]?.value || null,
      avatarUrl: profile.photos?.[0]?.value || null,
      accessToken,
    };

    let existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!existingUser) {
      existingUser = this.userRepository.create(user); // Create a new User entity
      await this.userRepository.save(existingUser); // Save the user to the database
    }

    return this.authService.validateUser(existingUser);
  }
}
