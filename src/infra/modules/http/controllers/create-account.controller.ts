import { Controller, Body, Post } from '@nestjs/common';

import { CreateAccount } from '@domain/use-cases/create-account';

import { CreateAccountDTO } from '../dtos/create-account.dto';
import { Public } from '../decorators/public.decorator';

@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccount: CreateAccount) {}

  @Public()
  @Post()
  async handle(@Body() body: CreateAccountDTO) {
    const { name, email, password } = body;

    await this.createAccount.execute({
      name,
      email,
      password,
    });
  }
}
