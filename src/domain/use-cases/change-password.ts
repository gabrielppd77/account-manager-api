import { Injectable } from '@nestjs/common';

import { AccountRepository } from '@domain/repositories/account.repository';

import { AccountNotFindException } from '@domain/exceptions/account-not-find.exception';
import { AccountPasswordNotValidException } from '@domain/exceptions/account-password-not-valid.exception';

import { compare, hash } from 'bcryptjs';

interface Request {
  accountId: string;
  oldPassword: string;
  newPassword: string;
}

type Response = void;

@Injectable()
export class ChangePassword {
  constructor(private accountRepository: AccountRepository) {}

  async execute(req: Request): Promise<Response> {
    const { accountId, oldPassword, newPassword } = req;

    const account = await this.accountRepository.findById(accountId);

    if (!account) {
      throw new AccountNotFindException();
    }

    const isPasswordValid = await compare(oldPassword, account.password);

    if (!isPasswordValid) {
      throw new AccountPasswordNotValidException();
    }

    const hashedNewPassword = await hash(newPassword, 8);

    await this.accountRepository.updatePassword(accountId, hashedNewPassword);
  }
}
