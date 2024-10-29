import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { BearerTokenStrategy } from './bearer-token.strategy';
import { AuthController } from './auth.controller';
import { OpaqueTokenModule } from 'src/opaque-token/opaque-token.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
    OpaqueTokenModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    BearerTokenStrategy, // Registra a estratégia customizada
  ],
  exports: [JwtModule],
})
export class AuthModule {}
