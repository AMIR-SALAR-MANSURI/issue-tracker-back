import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from 'src/Core/Entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    // Redirects to GitHub OAuth login
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req, @Res() res) {
    const result = await this.authService.login(req.user);
    const frontendUrl = `http://localhost:3001/auth/callback?token=${result.access_token}&user=${encodeURIComponent(
      JSON.stringify(result.user),
    )}`;

    console.log(result.access_token);

    return res.redirect(frontendUrl); // Redirect to your Next.js app with token
  }
  @Get('users')
  async findAll(): Promise<User[]> {
    return this.authService.findAll();
  }
}
