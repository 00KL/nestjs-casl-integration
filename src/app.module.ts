import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { OpaqueTokenModule } from './opaque-token/opaque-token.module';
import { ArticlesModule } from './article/article.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost/casl-integration',
    ),
    AuthModule,
    UsersModule,
    OpaqueTokenModule,
    ArticlesModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
