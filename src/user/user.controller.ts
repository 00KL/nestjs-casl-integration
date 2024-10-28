import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: any) {
    // Verifica se o usuário já existe
    const existingUser = await this.usersService.findByUsername(
      createUserDto.username,
    );
    if (existingUser) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

    // Cria o usuário e retorna o resultado
    const newUser = await this.usersService.create(createUserDto);
    return {
      message: 'User created successfully',
      user: {
        username: newUser.username,
        permissions: newUser.permissions,
      },
    };
  }
}
