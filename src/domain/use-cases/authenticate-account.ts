import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccountRepository } from '@domain/repositories/account.repository';
import { UnauthorizedException } from '@domain/exceptions/unauthorized.exception';

import { compare } from 'bcryptjs';
import { AccountPayload } from '@infra/modules/http/decorators/current-account.decorator';

interface Request {
  email: string;
  password: string;
}

interface Response {
  access_token: string;
}

@Injectable()
export class AuthenticateAccount {
  constructor(
    private accountRepository: AccountRepository,
    private jwtService: JwtService,
  ) {}
  async execute(req: Request): Promise<Response> {
    const { email, password } = req;

    const account = await this.accountRepository.findByEmail(email);

    if (!account) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload: AccountPayload = {
      sub: account.id.toValue(),
    };

    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }
}
