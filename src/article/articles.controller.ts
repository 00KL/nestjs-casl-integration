import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PoliciesGuard } from '../casl/polices.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { BearerTokenAuthGuard } from '../auth/bearer-token-auth.guard';

@Controller('articles')
export class ArticlesController {
  @CheckPolicies((ability) => ability.can('create', 'Article'))
  @UseGuards(BearerTokenAuthGuard, PoliciesGuard)
  @Post()
  createArticle() {
    return 'Article created';
  }

  @CheckPolicies((ability) => ability.can('read', 'Article'))
  @UseGuards(BearerTokenAuthGuard, PoliciesGuard)
  @Get()
  getArticles() {
    return 'Articles list';
  }
}
