import { User } from '@domain/entities/user';
import { AuthenticateAccount } from './authenticate-account';
import { JwtService } from '@nestjs/jwt';

import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';

import { hash } from 'bcryptjs';

import { UnauthorizedException } from '@domain/exceptions/unauthorized.exception';

describe('Authenticate account', () => {
  it('should be able authenticate an user', async () => {
    const jwtService = new JwtService({
      secret: '1234',
    });
    const userRepository = new InMemoryUserRepository();
    const authenticateAccount = new AuthenticateAccount(
      userRepository,
      jwtService,
    );

    const passwordAccount = '12345';

    const accountToCreate = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash(passwordAccount, 8),
    });

    await userRepository.create(accountToCreate);

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
    const userRepository = new InMemoryUserRepository();
    const authenticateAccount = new AuthenticateAccount(
      userRepository,
      jwtService,
    );

    const passwordAccount = '12345';

    const accountToCreate = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash(passwordAccount, 8),
    });

    await userRepository.create(accountToCreate);

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
    const userRepository = new InMemoryUserRepository();
    const authenticateAccount = new AuthenticateAccount(
      userRepository,
      jwtService,
    );

    const passwordAccount = '12345';

    const accountToCreate = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash(passwordAccount, 8),
    });

    await userRepository.create(accountToCreate);

    expect(
      async () =>
        await authenticateAccount.execute({
          email: accountToCreate.email,
          password: 'incorrect-password',
        }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
