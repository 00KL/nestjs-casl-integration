import { Module } from '@nestjs/common';
import { OpaqueTokenService } from './opaque-token.service';
import { OpaqueToken, OpaqueTokenSchema } from './opaque-token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OpaqueTokenController } from './opaque-token.controller';
import { AuthModule } from '../auth/auth.module';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OpaqueToken.name, schema: OpaqueTokenSchema },
    ]),
    AuthModule,
    CaslModule,
  ],
  providers: [OpaqueTokenService],
  controllers: [OpaqueTokenController],
  exports: [],
})
export class OpaqueTokenModule {}
