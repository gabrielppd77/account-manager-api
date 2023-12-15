import { Account } from '@domain/entities/account';
import { InMemoryAccountRepository } from '@test/repositories/in-memory-account.repository';

import { ChangePassword } from './change-password';

import { AccountNotFindException } from '@domain/exceptions/account-not-find.exception';
import { AccountPasswordNotValidException } from '@domain/exceptions/account-password-not-valid.exception';

import { compare, hash } from 'bcryptjs';

describe('ChangePassword', () => {
  it('should be able to change password of account', async () => {
    const accountRepository = new InMemoryAccountRepository();
    const changePassword = new ChangePassword(accountRepository);

    const oldPassword = '1234';

    const accountToCreate = new Account({
      email: 'jondoe@email.com',
      name: 'Jon Doe',
      password: await hash(oldPassword, 8),
    });
    accountRepository.create(accountToCreate);

    const newPassword = '4321';
    await changePassword.execute({
      accountId: accountToCreate.id.toValue(),
      newPassword,
      oldPassword,
    });

    const accountDB = accountRepository.accounts[0];

    const compareWithOldPassword = await compare(
      oldPassword,
      accountDB.password,
    );
    const compareWithNewPassword = await compare(
      newPassword,
      accountDB.password,
    );

    expect(compareWithOldPassword).toBeFalsy();
    expect(compareWithNewPassword).toBeTruthy();
  });

  it('should show error when not find an account', async () => {
    const accountRepository = new InMemoryAccountRepository();
    const changePassword = new ChangePassword(accountRepository);

    const oldPassword = '1234';

    const accountToCreate = new Account({
      email: 'jondoe@email.com',
      name: 'Jon Doe',
      password: await hash(oldPassword, 8),
    });

    const newPassword = '4321';

    expect(
      async () =>
        await changePassword.execute({
          accountId: accountToCreate.id.toValue(),
          newPassword,
          oldPassword,
        }),
    ).rejects.toThrow(AccountNotFindException);
  });

  it('should show error when password is not valid', async () => {
    const accountRepository = new InMemoryAccountRepository();
    const changePassword = new ChangePassword(accountRepository);

    const oldPassword = '1234';

    const accountToCreate = new Account({
      email: 'jondoe@email.com',
      name: 'Jon Doe',
      password: await hash(oldPassword, 8),
    });
    accountRepository.create(accountToCreate);

    const newPassword = '4321';

    expect(
      async () =>
        await changePassword.execute({
          accountId: accountToCreate.id.toValue(),
          newPassword,
          oldPassword: 'invalid-password',
        }),
    ).rejects.toThrow(AccountPasswordNotValidException);
  });
});
