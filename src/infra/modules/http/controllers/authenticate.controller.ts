import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthenticateAccount } from '@domain/use-cases/authenticate-account';

import { AuthenticateBodyDTO } from '../dtos/authenticate-body.dto';
import { AuthenticateResponseDTO } from '../view/authenticate-response.dto';

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateAccount: AuthenticateAccount) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() body: AuthenticateBodyDTO,
  ): Promise<AuthenticateResponseDTO> {
    const { email, password } = body;

    const { access_token } = await this.authenticateAccount.execute({
      email,
      password,
    });

    return { access_token };
  }
}
