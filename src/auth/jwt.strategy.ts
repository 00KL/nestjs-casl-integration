import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      // Use uma variável de ambiente para o segredo
      secretOrKey: process.env.JWT_SECRET || 'my_secret_key',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    console.log('payload');
    const user = { userId: payload.userId, username: payload.username };
    return user; // Retorna o usuário, que será injetado em request.user
  }
}
