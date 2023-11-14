import { User } from '@app/entities/user';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';

import { CreateUser } from './create-user';
import { EmailInUseException } from './exceptions/email-in-use.exception';

describe('CreateUser', () => {
  it('should be able to create an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);

    const userToCreate = {
      email: 'emailValid@email.com',
      name: 'Jon Doe',
      password: '1234',
    };

    await createUser.execute(userToCreate);

    const userCreatedInDB = userRepository.users[0];

    expect(userCreatedInDB).toBeTruthy();

    expect(userCreatedInDB.id).toBeDefined();
    expect(userCreatedInDB.password).toBeDefined();
    expect(userCreatedInDB.password).not.toEqual(userToCreate.password);
    expect(userCreatedInDB.email).toEqual(userToCreate.email);
  });

  it('should show error when found email that has been registred', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);

    const emailRepeated = 'email@valid.com';

    const newUser = new User({
      email: emailRepeated,
      password: '1234',
    });

    await userRepository.create(newUser);

    expect(
      async () =>
        await createUser.execute({
          email: emailRepeated,
          password: '1234',
        }),
    ).rejects.toThrow(EmailInUseException);
  });
});
