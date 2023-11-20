import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '@domain/repositories/user.repository';
import { UnauthorizedException } from '@domain/exceptions/unauthorized.exception';

import { compare } from 'bcryptjs';
import { UserPayload } from '@infra/modules/http/decorators/current-user.decorator';

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
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async execute(req: Request): Promise<Response> {
    const { email, password } = req;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload: UserPayload = {
      sub: user.id.toValue(),
    };

    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }
}
