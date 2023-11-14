import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@app/entities/user';

export interface Payload {
  sub: string;
  email: string;
}

interface Request {
  user: User;
}

interface Response {
  access_token: string;
}

@Injectable()
export class LoginUser {
  constructor(private jwtService: JwtService) {}

  execute(req: Request): Response {
    const { user } = req;

    const payload = { email: user.email, sub: user.id.toValue() } as Payload;

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
