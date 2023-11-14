import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { UserRepository } from '@app/repositories/user.repository';

import { User } from '../entities/user';
import { EmailInUseException } from './exceptions/email-in-use.exception';

interface Request {
  email: string;
  password: string;
}

type Response = void;

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: Request): Promise<Response> {
    const { email, password } = request;

    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) throw new EmailInUseException();

    const hashPassword = await hash(password, 10);

    const user = new User({
      email,
      password: hashPassword,
    });

    await this.userRepository.create(user);
  }
}
