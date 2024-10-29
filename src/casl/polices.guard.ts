import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './check-policies.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verifica se o usuário foi autenticado
    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    // Cria a habilidade CASL com as permissões do usuário, independentemente do tipo de token
    const ability = this.caslAbilityFactory.createForUser({
      ...user,
      permissions: user.permissions,
    });

    // Executa as funções de verificação de política
    return policyHandlers.every((handler) => handler(ability));
  }
}
