import { Account } from '@domain/entities/account';
import { AuthenticateAccount } from './authenticate-account';
import { JwtService } from '@nestjs/jwt';

import { InMemoryAccountRepository } from '@test/repositories/in-memory-account.repository';

import { hash } from 'bcryptjs';

import { UnauthorizedException } from '@domain/exceptions/unauthorized.exception';

describe('Authenticate account', () => {
  it('should be able authenticate an account', async () => {
    const jwtService = new JwtService({
      secret: '1234',
    });
    const accountRepository = new InMemoryAccountRepository();
    const authenticateAccount = new AuthenticateAccount(
      accountRepository,
      jwtService,
    );

    const passwordAccount = '12345';

    const accountToCreate = new Account({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash(passwordAccount, 8),
    });

    await accountRepository.create(accountToCreate);

    const { access_token } = await authenticateAccount.execute({
      email: accountToCreate.email,
      password: passwordAccount,
    });

    expect(access_token).toBeTruthy();
  });

  it('should be able to show an error when pass the incorrect email', async () => {
    const jwtService = new JwtService({
      secret: '1234',
    });
    const accountRepository = new InMemoryAccountRepository();
    const authenticateAccount = new AuthenticateAccount(
      accountRepository,
      jwtService,
    );

    const passwordAccount = '12345';

    const accountToCreate = new Account({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash(passwordAccount, 8),
    });

    await accountRepository.create(accountToCreate);

    expect(
      async () =>
        await authenticateAccount.execute({
          email: 'email@incorrect.com',
          password: passwordAccount,
        }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should be able to show an error when pass the incorrect password', async () => {
    const jwtService = new JwtService({
      secret: '1234',
    });
    const accountRepository = new InMemoryAccountRepository();
    const authenticateAccount = new AuthenticateAccount(
      accountRepository,
      jwtService,
    );

    const passwordAccount = '12345';

    const accountToCreate = new Account({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash(passwordAccount, 8),
    });

    await accountRepository.create(accountToCreate);

    expect(
      async () =>
        await authenticateAccount.execute({
          email: accountToCreate.email,
          password: 'incorrect-password',
        }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
