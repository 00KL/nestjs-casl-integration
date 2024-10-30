import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Request,
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

  @Post(':id/permissions/update')
  async updatePermissions(@Request() req, @Body() body: any) {
    // Atualiza as permissões do usuário
    const updatedUser = await this.usersService.updatePermissions(
      req.params.id,
      body.permissions,
    );
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Permissions updated successfully',
      user: {
        username: updatedUser.username,
        permissions: updatedUser.permissions,
      },
    };
  }
}
