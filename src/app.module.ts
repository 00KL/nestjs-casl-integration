import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { OpaqueTokenModule } from './opaque-token/opaque-token.module';
import { ArticlesModule } from './article/article.module';
import { CaslModule } from './casl/casl.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/casl-integration'),
    AuthModule,
    UsersModule,
    OpaqueTokenModule,
    ArticlesModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Registra o PoliciesGuard como global
    },
  ],
})
export class AppModule {}
