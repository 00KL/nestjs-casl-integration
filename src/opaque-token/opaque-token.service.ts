import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OpaqueToken, OpaqueTokenDocument } from './opaque-token.schema';
import { Model } from 'mongoose';
import crypto from 'crypto';

@Injectable()
export class OpaqueTokenService {
  constructor(
    @InjectModel(OpaqueToken.name)
    private tokenModel: Model<OpaqueTokenDocument>,
  ) {}

  async create(userId: string, permissions: string[]): Promise<OpaqueToken> {
    const tokenValue = crypto.randomBytes(32).toString('hex');
    const token = new this.tokenModel({
      token: tokenValue,
      userId,
      permissions,
      enabled: true,
      createdAt: new Date(),
    });
    return token.save();
  }

  async findByToken(token: string): Promise<OpaqueToken> {
    return this.tokenModel.findOne({ token, enabled: true });
  }

  async revoke(token: string): Promise<void> {
    await this.tokenModel.updateOne({ token }, { enabled: false });
  }

  async updatePermissions(token: string, permissions: string[]): Promise<void> {
    await this.tokenModel.updateOne({ token }, { permissions });
  }
}
