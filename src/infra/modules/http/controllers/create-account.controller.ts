import { Controller, Body, Post } from '@nestjs/common';

import { CreateAccount } from '@domain/use-cases/create-account';

import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccount: CreateAccount) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createAccountBodySchema))
    body: CreateAccountBodySchema,
  ) {
    const { name, email, password } = body;

    await this.createAccount.execute({
      name,
      email,
      password,
    });
  }
}
