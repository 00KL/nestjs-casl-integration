import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserSchema, User } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
