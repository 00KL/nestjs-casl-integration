import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      return { message: 'Usuário ou senha incorretos' };
    }
    return this.authService.login(user);
  }
}
