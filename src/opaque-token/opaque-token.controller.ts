import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { OpaqueTokenService } from './opaque-token.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('opaque-token')
export class OpaqueTokenController {
  constructor(private tokenService: OpaqueTokenService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  async generateToken(@Request() req, @Body() body) {
    const permissions = body.permissions;
    const token = await this.tokenService.create(req.user.userId, permissions);
    return { token: token.token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('revoke')
  async revokeToken(@Body() body) {
    await this.tokenService.revoke(body.token);
    return { message: 'Token revogado com sucesso' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-permissions')
  async updatePermissions(@Body() body) {
    await this.tokenService.updatePermissions(body.token, body.permissions);
    return { message: 'Permissões atualizadas com sucesso' };
  }
}
