import { Injectable } from '@nestjs/common';

import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';

import { UserEmailAlreadyExistsException } from '@domain/exceptions/user-email-already-exists.exception';

import { hash } from 'bcryptjs';

interface Request {
  name: string;
  email: string;
  password: string;
}

type Response = void;

@Injectable()
export class CreateAccount {
  constructor(private userRepository: UserRepository) {}

  async execute(req: Request): Promise<Response> {
    const { name, email, password } = req;

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserEmailAlreadyExistsException();
    }

    const hashedPassword = await hash(password, 8);

    const user = new User({
      email,
      name,
      password: hashedPassword,
    });

    await this.userRepository.create(user);
  }
}
