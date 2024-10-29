import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BearerTokenAuthGuard extends AuthGuard('bearer-token') {}
