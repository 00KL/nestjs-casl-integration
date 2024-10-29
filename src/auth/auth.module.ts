import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose'; // Importa o MongooseModule
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { OpaqueTokenService } from '../opaque-token/opaque-token.service';
import { BearerTokenStrategy } from './bearer-token.strategy';
import {
  OpaqueToken,
  OpaqueTokenSchema,
} from '../opaque-token/opaque-token.schema';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my_secret_key',
      signOptions: { expiresIn: '1h' },
    }),

    MongooseModule.forFeature([
      { name: OpaqueToken.name, schema: OpaqueTokenSchema },
    ]), // Registra o modelo
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    BearerTokenStrategy, // Registra a estratégia customizada
    OpaqueTokenService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtStrategy, JwtAuthGuard, JwtModule],
})
export class AuthModule {}
