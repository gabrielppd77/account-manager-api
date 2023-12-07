import { Injectable } from '@nestjs/common';

import { Account } from '@domain/entities/account';
import { AccountRepository } from '@domain/repositories/account.repository';

import { AccountEmailAlreadyExistsException } from '@domain/exceptions/account-email-already-exists.exception';

import { hash } from 'bcryptjs';

interface Request {
  name: string;
  email: string;
  password: string;
}

type Response = void;

@Injectable()
export class CreateAccount {
  constructor(private accountRepository: AccountRepository) {}

  async execute(req: Request): Promise<Response> {
    const { name, email, password } = req;

    const accountWitSameEmail = await this.accountRepository.findByEmail(email);

    if (accountWitSameEmail) {
      throw new AccountEmailAlreadyExistsException();
    }

    const hashedPassword = await hash(password, 8);

    const account = new Account({
      email,
      name,
      password: hashedPassword,
    });

    await this.accountRepository.create(account);
  }
}
