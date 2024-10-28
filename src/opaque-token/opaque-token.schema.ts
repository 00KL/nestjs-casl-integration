import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OpaqueTokenDocument = OpaqueToken & Document;

@Schema()
export class OpaqueToken {
  @Prop()
  token: string;

  @Prop()
  userId: string;

  @Prop([String])
  permissions: string[];

  @Prop()
  enabled: boolean;

  @Prop()
  createdAt: Date;
}

export const OpaqueTokenSchema = SchemaFactory.createForClass(OpaqueToken);
