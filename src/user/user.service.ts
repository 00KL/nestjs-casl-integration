import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: any): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    const createdUser = new this.userModel({
      username: userDto.username,
      password: hashedPassword,
      permissions: userDto.permissions || [],
    });
    return createdUser.save();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  // Atualiza permissões de um usuário
  async updatePermissions(
    id: string,
    permissions: string[],
  ): Promise<User | undefined> {
    return this.userModel.findByIdAndUpdate(id, { permissions }, { new: true });
  }

  // Outras funções conforme necessário
}
