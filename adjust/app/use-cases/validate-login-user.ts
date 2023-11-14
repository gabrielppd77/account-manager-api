import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UserRepository } from '@app/repositories/user.repository';
import { User } from '@app/entities/user';

import { EmailOrPasswordIncorrectException } from './exceptions/email-or-password-incorrect.exception';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

@Injectable()
export class ValidateLoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute(req: Request): Promise<Response> {
    const { email, password } = req;

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new EmailOrPasswordIncorrectException();

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) throw new EmailOrPasswordIncorrectException();

    return { user };
  }
}
