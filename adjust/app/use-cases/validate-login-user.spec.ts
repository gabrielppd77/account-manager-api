import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';

import { ValidateLoginUser } from './validate-login-user';
import { CreateUser } from './create-user';

import { EmailOrPasswordIncorrectException } from './exceptions/email-or-password-incorrect.exception';

describe('validate user login', () => {
  it('should be able to authenticate an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);
    const validateLoginUser = new ValidateLoginUser(userRepository);

    const userToCreate = {
      email: 'email@emailvalid.com',
      password: '1234',
      name: 'Jon Doe',
    };

    await createUser.execute(userToCreate);

    const { user } = await validateLoginUser.execute({
      email: userToCreate.email,
      password: userToCreate.password,
    });

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toEqual(userToCreate.email);
    expect(user.password).not.toEqual(userToCreate.password);
  });

  it('should be able to show an error when pass the incorrect email', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);
    const validateLoginUser = new ValidateLoginUser(userRepository);

    const userToCreate = {
      email: 'email@correct.com',
      password: '1234',
      name: 'Jon Doe',
    };

    await createUser.execute(userToCreate);

    expect(
      async () =>
        await validateLoginUser.execute({
          email: 'email@incorrect.com',
          password: userToCreate.password,
        }),
    ).rejects.toThrow(EmailOrPasswordIncorrectException);
  });

  it('should be able to show an error when pass the incorrect password', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);
    const validateLoginUser = new ValidateLoginUser(userRepository);

    const userToCreate = {
      email: 'email@correct.com',
      password: '12345678',
    };

    await createUser.execute(userToCreate);

    expect(
      async () =>
        await validateLoginUser.execute({
          email: userToCreate.email,
          password: 'incorrect-password',
        }),
    ).rejects.toThrow(EmailOrPasswordIncorrectException);
  });
});
