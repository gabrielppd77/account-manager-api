import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthenticateAccount } from '@domain/use-cases/authenticate-account';

import { ZodValidationPipe } from '@infra/modules/http/pipes/zod-validation.pipe';
import { z } from 'zod';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateAccount: AuthenticateAccount) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body(new ZodValidationPipe(authenticateBodySchema))
    body: AuthenticateBodySchema,
  ) {
    const { email, password } = body;

    const { access_token } = await this.authenticateAccount.execute({
      email,
      password,
    });

    return { access_token };
  }
}
