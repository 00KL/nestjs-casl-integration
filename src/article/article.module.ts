import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './article.schema';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { CaslModule } from '../casl/casl.module'; // Importa o CaslModule
import { UsersModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { OpaqueTokenModule } from 'src/opaque-token/opaque-token.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    CaslModule, // Adiciona o CaslModule para disponibilizar o CaslAbilityFactory
    UsersModule,
    OpaqueTokenModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
