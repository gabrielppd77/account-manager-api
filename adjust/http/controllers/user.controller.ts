import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';

import { User } from '@app/entities/user';

import { CreateUser } from '@app/use-cases/create-user';
import { LoginUser } from '@app/use-cases/login-user';

import { LocalAuthGuard } from '@infra/auth/guards/local-auth.guard';

import { CreateUserBody } from '../dtos/create-user-body';

import { Public } from '../decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser, private loginUser: LoginUser) {}

  @Public()
  @Post('create')
  async create(@Body() body: CreateUserBody) {
    const { email, password } = body;

    await this.createUser.execute({
      email,
      password,
    });

    return {
      statusCode: 201,
      message: 'Usuário criado com sucesso.',
      data: null,
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req) {
    const userAuthenticated = req.user as User;

    const { access_token } = await this.loginUser.execute({
      user: userAuthenticated,
    });

    return {
      statusCode: 200,
      message: 'Login realizado com sucesso.',
      data: {
        access_token,
      },
    };
  }
}
