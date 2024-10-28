import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = 'Article' | 'User' | 'OpaqueToken' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    user.permissions.forEach((permission) => {
      // Exemplo: 'create:Article'
      const [action, subject] = permission.split(':');
      can(action as Actions, subject as Subjects);
    });

    return build({
      detectSubjectType: (item: any) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
