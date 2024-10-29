import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { OpaqueTokenService } from './opaque-token.service';
import { PoliciesGuard } from '../casl/polices.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { BearerTokenAuthGuard } from '../auth/bearer-token-auth.guard';

@Controller('opaque-token')
export class OpaqueTokenController {
  constructor(private tokenService: OpaqueTokenService) {}

  @UseGuards(BearerTokenAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('create', 'OpaqueToken'))
  @Post('generate')
  async generateToken(@Request() req, @Body() body) {
    const permissions = body.permissions;
    const token = await this.tokenService.create(req.user.userId, permissions);
    return { token: token.token };
  }

  @UseGuards(BearerTokenAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('deactivate', 'OpaqueToken'))
  @Post('revoke')
  async revokeToken(@Body() body) {
    await this.tokenService.revoke(body.token);
    return { message: 'Token revogado com sucesso' };
  }

  @UseGuards(BearerTokenAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('edit', 'OpaqueToken'))
  @Post('update-permissions')
  async updatePermissions(@Body() body) {
    await this.tokenService.updatePermissions(body.token, body.permissions);
    return { message: 'Permissões atualizadas com sucesso' };
  }
}
