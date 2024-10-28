import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OpaqueAuthGuard extends AuthGuard('opaque-token') {}
