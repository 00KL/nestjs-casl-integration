import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { JwtService } from '@nestjs/jwt';
import { OpaqueTokenService } from '../opaque-token/opaque-token.service';
import { UsersService } from '../user/user.service';

@Injectable()
export class BearerTokenStrategy extends PassportStrategy(
  Strategy,
  'bearer-token',
) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly opaqueTokenService: OpaqueTokenService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  async validate(req: Request): Promise<any> {
    // Extrai o token do cabeçalho Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token Bearer não fornecido');
    }

    const token = authHeader.split(' ')[1];

    // Verifica se o token parece ser um JWT (3 partes separadas por pontos)
    if (token.split('.').length === 3) {
      try {
        // Tenta validar como JWT
        const payload = this.jwtService.verify(token);

        // Busca o usuário e suas permissões no banco de dados
        const user = await this.usersService.findById(payload.userId);
        if (!user) {
          throw new UnauthorizedException('Usuário não encontrado');
        }

        return {
          userId: payload.userId,
          username: user.username,
          permissions: user.permissions, // Permissões carregadas do banco de dados
          isOpaque: false,
        };
      } catch (err) {
        throw new UnauthorizedException('Token JWT inválido');
      }
    } else {
      // Tenta validar como um token opaco
      const tokenData = await this.opaqueTokenService.findByToken(token);
      if (tokenData && tokenData.enabled) {
        return {
          userId: tokenData.userId,
          permissions: tokenData.permissions,
          isOpaque: true,
        };
      } else {
        throw new UnauthorizedException('Token opaco inválido ou desabilitado');
      }
    }
  }
}
