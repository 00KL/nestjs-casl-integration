import { Module } from '@nestjs/common';
import { OpaqueTokenService } from './opaque-token.service';
import { OpaqueToken, OpaqueTokenSchema } from './opaque-token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OpaqueToken.name, schema: OpaqueTokenSchema },
    ]),
  ],
  providers: [OpaqueTokenService],
  exports: [OpaqueTokenService],
})
export class OpaqueTokenModule {}
