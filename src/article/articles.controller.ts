import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PoliciesGuard } from '../casl/polices.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';

@Controller('articles')
export class ArticlesController {
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can('create', 'Article'))
  @Post()
  createArticle() {
    return 'Article created';
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can('read', 'Article'))
  @Get()
  getArticles() {
    return 'Articles list';
  }
}
