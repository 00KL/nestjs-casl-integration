import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { OpaqueTokenService } from '../opaque-token/opaque-token.service';

@Injectable()
export class OpaqueTokenStrategy extends PassportStrategy(
  Strategy,
  'opaque-token',
) {
  constructor(private tokenService: OpaqueTokenService) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const token = req.headers['x-access-token'] as string;
    if (!token) {
      throw new UnauthorizedException();
    }
    const tokenData = await this.tokenService.findByToken(token);
    if (!tokenData) {
      throw new UnauthorizedException();
    }
    return { userId: tokenData.userId, permissions: tokenData.permissions };
  }
}
