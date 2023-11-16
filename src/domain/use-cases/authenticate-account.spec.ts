import { ConfigService } from '@nestjs/config';
import { Env } from '@infra/modules/env/env';

import { EnvService } from '@infra/modules/env/env.service';
import { AuthenticateAccount } from './authenticate-account';
import { CreateAccount } from './create-account';
import { JwtService } from '@nestjs/jwt';

import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';

const JWT_SECRET = 'JWT_SECRET_FOR_TEST';

describe('Authenticate account', () => {
  it('should be able authenticate an user', async () => {
    const configService = new ConfigService<Env, true>();
    const envService = new EnvService(configService);
    const jwtService = new JwtService({
      publicKey: envService.get('JWT_PUBLIC_KEY'),
    });

    const userRepository = new InMemoryUserRepository();
    const createAccount = new CreateAccount(userRepository);
    const authenticateAccount = new AuthenticateAccount(
      userRepository,
      jwtService,
    );

    const accountToCreate = {
      email: 'jondoe@email.com',
      password: '1234',
      name: 'Jon Doe',
    };

    await createAccount.execute(accountToCreate);

    const { user } = await authenticateAccount.execute({
      email: accountToCreate.email,
      password: accountToCreate.password,
    });

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toEqual(accountToCreate.email);
    expect(user.password).not.toEqual(accountToCreate.password);
  });

  it('should be able to show an error when pass the incorrect email', async () => {
    const userRepository = new InMemoryUserRepository();
    const createAccount = new CreateAccount(userRepository);
    const authenticateAccount = new AuthenticateAccount(userRepository);

    const accountToCreate = {
      email: 'email@correct.com',
      password: '1234',
      name: 'Jon Doe',
    };

    await createAccount.execute(accountToCreate);

    expect(
      async () =>
        await authenticateAccount.execute({
          email: 'email@incorrect.com',
          password: accountToCreate.password,
        }),
    ).rejects.toThrow(EmailOrPasswordIncorrectException);
  });

  it('should be able to show an error when pass the incorrect password', async () => {
    const userRepository = new InMemoryUserRepository();
    const createAccount = new CreateAccount(userRepository);
    const authenticateAccount = new AuthenticateAccount(userRepository);

    const accountToCreate = {
      email: 'email@correct.com',
      password: '12345678',
    };

    await createAccount.execute(accountToCreate);

    expect(
      async () =>
        await authenticateAccount.execute({
          email: accountToCreate.email,
          password: 'incorrect-password',
        }),
    ).rejects.toThrow(EmailOrPasswordIncorrectException);
  });

  it('should login an user and create tokens correctly', async () => {
    const jwtService = new JwtService({
      secret: JWT_SECRET,
    });
    const loginUser = new LoginUser(jwtService);

    const inMemoryRepository = new InMemoryUserRepository();
    const createAccount = new CreateAccount(inMemoryRepository);

    await createAccount.execute({
      email: 'email@valid.com',
      password: '1234',
    });
    const userCreated = inMemoryRepository.users[0];

    const { access_token } = loginUser.execute({ user: userCreated });

    expect(access_token).toBeTruthy();
  });
});
