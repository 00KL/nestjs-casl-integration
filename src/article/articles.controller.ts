import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PoliciesGuard } from '../casl/polices.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { BearerTokenAuthGuard } from '../auth/bearer-token-auth.guard';

@Controller('articles')
export class ArticlesController {
  @UseGuards(BearerTokenAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('create', 'Article'))
  @Post()
  createArticle() {
    return 'Article created';
  }

  @UseGuards(BearerTokenAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('read', 'Article'))
  @Get()
  getArticles() {
    return 'Articles list';
  }
}
