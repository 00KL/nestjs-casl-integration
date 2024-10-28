import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './check-policies.decorator';
import { UsersService } from '../user/user.service';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private usersService: UsersService, // Injeta o serviço de usuários
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('PoliciesGuard');
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();

    console.log('request.user', request.user);

    const userId = request.user?.userId; // Usa ?. para evitar erro se user for undefined

    // Se o usuário não estiver autenticado, bloqueia o acesso
    if (!userId) {
      return false;
    }

    console.log('userId', userId);

    // Carrega o usuário do banco de dados
    const user = await this.usersService.findById(userId);
    if (!user) return false;

    // Cria a habilidade CASL com as permissões do usuário
    const ability = this.caslAbilityFactory.createForUser(user);

    // Executa as funções de verificação de política
    return policyHandlers.every((handler) => handler(ability));
  }
}
