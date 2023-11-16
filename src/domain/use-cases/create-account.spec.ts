import { User } from '@domain/entities/user';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';

import { CreateAccount } from './create-account';
import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists.exception';

describe('CreateAccount', () => {
  it('should be able to create an account', async () => {
    const userRepository = new InMemoryUserRepository();
    const createAccount = new CreateAccount(userRepository);

    const accountToCreate = {
      email: 'jondoe@email.com',
      name: 'Jon Doe',
      password: '1234',
    };

    await createAccount.execute(accountToCreate);

    const accountCreated = userRepository.users[0];

    expect(accountCreated).toBeTruthy();

    expect(accountCreated.id).toBeDefined();
    expect(accountCreated.password).toBeDefined();
    expect(accountCreated.password).not.toEqual(accountToCreate.password);
    expect(accountCreated.email).toEqual(accountToCreate.email);
  });

  it('should show error when found that email already exists', async () => {
    const userRepository = new InMemoryUserRepository();
    const createAccount = new CreateAccount(userRepository);

    const emailRepeated = 'email@valid.com';

    const newUser = new User({
      email: emailRepeated,
      password: '1234',
      name: 'jondoe',
    });

    await userRepository.create(newUser);

    expect(
      async () =>
        await createAccount.execute({
          email: emailRepeated,
          password: '1234',
          name: 'jondoe',
        }),
    ).rejects.toThrow(UserEmailAlreadyExistsException);
  });
});
