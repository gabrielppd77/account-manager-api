import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthenticateAccount } from '@domain/use-cases/authenticate-account';

import { AuthenticateDTO } from '../dtos/authenticate.dto';
import { AuthenticatePresenter } from '../presenters/authenticate.presenter';

import { Public } from '../decorators/public.decorator';

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateAccount: AuthenticateAccount) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: AuthenticateDTO): Promise<AuthenticatePresenter> {
    const { email, password } = body;

    const { access_token } = await this.authenticateAccount.execute({
      email,
      password,
    });

    return { access_token };
  }
}
