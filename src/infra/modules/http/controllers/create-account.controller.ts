import { Controller, Body, Post } from '@nestjs/common';

import { CreateAccount } from '@domain/use-cases/create-account';

import { CreateAccountBodyDTO } from '../dtos/create-account-body.dto';

@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccount: CreateAccount) {}

  @Post()
  async handle(@Body() body: CreateAccountBodyDTO) {
    const { name, email, password } = body;

    await this.createAccount.execute({
      name,
      email,
      password,
    });
  }
}
