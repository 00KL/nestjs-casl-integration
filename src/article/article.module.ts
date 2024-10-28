import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './article.schema';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { CaslModule } from '../casl/casl.module'; // Importa o CaslModule
import { UsersModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    CaslModule, // Adiciona o CaslModule para disponibilizar o CaslAbilityFactory
    UsersModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
